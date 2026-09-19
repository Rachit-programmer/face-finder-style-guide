import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { Loader2, Upload, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzeFace, type AnalysisResult } from "@/lib/analyze.functions";
import { FACE_SHAPES, getShape, type Gender } from "@/lib/face-shapes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FaceForm — Face Shape Analysis & Hairstyle Finder" },
      {
        name: "description",
        content:
          "Upload a photo and get your face shape probabilities plus five hairstyle recommendations for men and women.",
      },
      { property: "og:title", content: "FaceForm — Face Shape Analysis & Hairstyle Finder" },
      {
        property: "og:description",
        content:
          "Upload a photo and get your face shape probabilities plus five hairstyle recommendations for men and women.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const run = useServerFn(analyzeFace);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [gender, setGender] = useState<Gender>("women");

  async function handleFile(file: File) {
    setError(null);
    setResult(null);
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("That photo is larger than 8 MB. Try a smaller one.");
      return;
    }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Could not read that file."));
      reader.readAsDataURL(file);
    });
    setPreview(dataUrl);
    setLoading(true);
    try {
      const res = await run({ data: { image: dataUrl } });
      setResult(res);
      if (res.perceivedGender !== "unknown") setGender(res.perceivedGender);
    } catch {
      setError("The analysis didn't go through. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  const ranked =
    result?.probabilities
      .slice()
      .sort((a, b) => b.probability - a.probability)
      .filter((p) => getShape(p.shape)) ?? [];
  const top = ranked[0] ? getShape(ranked[0].shape) : null;

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-[image:var(--color-gradient-warm)]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs tracking-widest uppercase text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Face shape studio
          </p>
          <h1 className="max-w-2xl text-5xl leading-[1.05] md:text-7xl">
            Find your face shape. Then find the haircut that fits it.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground">
            Upload a straight-on photo. You'll get a probability for each of the seven face shapes
            and five tailored hairstyles for men and for women.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <Card className="overflow-hidden shadow-[var(--shadow-soft)]">
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
            <div className="flex h-44 w-44 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted">
              {preview ? (
                <img src={preview} alt="Your upload" className="h-full w-full object-cover" />
              ) : (
                <span className="px-4 text-center text-sm text-muted-foreground">
                  Your photo appears here
                </span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl">Upload a photo</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Face the camera, hair pulled back if possible, even lighting. Photos are analysed
                and never stored.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button onClick={() => inputRef.current?.click()} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Analysing…
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" /> Choose photo
                    </>
                  )}
                </Button>
                {result && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setResult(null);
                      setPreview(null);
                      setError(null);
                    }}
                  >
                    <RefreshCw className="h-4 w-4" /> Start over
                  </Button>
                )}
              </div>
              {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
              {result && !result.isFace && (
                <p className="mt-3 text-sm text-destructive">{result.message}</p>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (f) void handleFile(f);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {result?.isFace && top && (
          <div className="mt-12 space-y-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Most likely shape
              </p>
              <h2 className="mt-1 text-4xl">
                {top.label}{" "}
                <span className="text-primary">{Math.round(ranked[0]?.probability ?? 0)}%</span>
              </h2>

              <p className="mt-2 max-w-2xl text-muted-foreground">{top.description}</p>
              {result.observations.length > 0 && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {result.observations.map((o) => (
                    <li
                      key={o}
                      className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="text-2xl">Shape probabilities</h3>
              <div className="mt-4 space-y-3">
                {ranked.map((p) => (
                  <div key={p.shape}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{getShape(p.shape)!.label}</span>
                      <span className="text-muted-foreground">{Math.round(p.probability)}%</span>
                    </div>
                    <Progress value={p.probability} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl">Hairstyles for a {top.label.toLowerCase()} face</h3>
              <Tabs
                value={gender}
                onValueChange={(v) => setGender(v as Gender)}
                className="mt-4"
              >
                <TabsList>
                  <TabsTrigger value="women">Women</TabsTrigger>
                  <TabsTrigger value="men">Men</TabsTrigger>
                </TabsList>
                {(["women", "men"] as Gender[]).map((g) => (
                  <TabsContent key={g} value={g} className="mt-5 grid gap-4 sm:grid-cols-2">
                    {top.hairstyles[g].map((h, i) => (
                      <Card key={h.name} className="shadow-[var(--shadow-soft)]">
                        <CardContent className="p-5">
                          <p className="text-xs text-muted-foreground">0{i + 1}</p>
                          <p className="mt-1 text-lg font-medium">{h.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{h.why}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="p-5">
                    <p className="text-sm font-medium">Defining traits</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {top.traits.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <p className="text-sm font-medium">Better to avoid</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {top.avoid.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16">
          <h3 className="text-2xl">All face shapes</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FACE_SHAPES.map((s) => (
              <Card key={s.id}>
                <CardContent className="p-5">
                  <p className="text-lg font-medium">{s.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                    10 hairstyles inside
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
