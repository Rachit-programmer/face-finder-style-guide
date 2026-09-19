export type Gender = "men" | "women";

export type Hairstyle = {
  name: string;
  why: string;
};

export type FaceShape = {
  id: string;
  label: string;
  description: string;
  traits: string[];
  avoid: string[];
  hairstyles: Record<Gender, Hairstyle[]>;
};

export const FACE_SHAPES: FaceShape[] = [
  {
    id: "oval",
    label: "Oval",
    description:
      "Balanced proportions with a gently rounded jaw and a forehead slightly wider than the chin.",
    traits: ["Length about 1.5x width", "Soft, rounded jawline", "Forehead marginally widest point"],
    avoid: ["Heavy straight-across fringes that shorten the face", "Flat, volume-free styles"],
    hairstyles: {
      men: [
        { name: "Classic side part", why: "Clean structure that flatters already balanced proportions." },
        { name: "Textured crop", why: "Adds movement on top without distorting the natural balance." },
        { name: "Medium swept-back quiff", why: "Opens the face and shows off even proportions." },
        { name: "Buzz cut with a faded edge", why: "Oval shapes are one of the few that suit ultra-short cuts." },
        { name: "Shoulder-length layers", why: "Long layers frame the jaw without adding width." },
      ],
      women: [
        { name: "Long blunt cut with face-framing pieces", why: "Highlights symmetry while keeping weight low." },
        { name: "Collarbone lob", why: "A universally flattering length for balanced proportions." },
        { name: "Curtain bangs", why: "Softens the forehead without hiding the face." },
        { name: "Soft beach waves", why: "Adds texture while keeping the natural outline visible." },
        { name: "Sleek high ponytail", why: "Oval shapes carry pulled-back styles effortlessly." },
      ],
    },
  },
  {
    id: "round",
    label: "Round",
    description: "Similar width and length with full cheeks and a soft, curved jawline.",
    traits: ["Width close to length", "Fullest at the cheekbones", "Rounded chin"],
    avoid: ["Chin-length bobs that echo the curve", "Heavy volume at the sides"],
    hairstyles: {
      men: [
        { name: "Pompadour", why: "Height on top lengthens a face that reads wide." },
        { name: "High fade with textured top", why: "Tight sides visually slim the cheeks." },
        { name: "Angular fringe", why: "Sharp lines counter soft curves." },
        { name: "Faux hawk", why: "Strong vertical line elongates the whole shape." },
        { name: "Undercut with slicked back top", why: "Removes side bulk and adds length." },
      ],
      women: [
        { name: "Long layers past the collarbone", why: "Vertical lines stretch the face." },
        { name: "Deep side part", why: "Breaks the symmetry that emphasises roundness." },
        { name: "A-line lob angled forward", why: "Creates a sharper jaw illusion." },
        { name: "High top knot with loose tendrils", why: "Adds height while framing the cheeks." },
        { name: "Side-swept long bangs", why: "Cuts diagonal lines across a rounded forehead." },
      ],
    },
  },
  {
    id: "square",
    label: "Square",
    description: "Strong, angular jaw with forehead, cheekbones and jaw of similar width.",
    traits: ["Defined, wide jawline", "Straight hairline", "Equal facial widths"],
    avoid: ["Blunt jaw-length cuts that square you off further", "Severe flat-top shapes"],
    hairstyles: {
      men: [
        { name: "Textured brush up", why: "Softens the angles while keeping the strong jaw visible." },
        { name: "Crew cut", why: "Clean and structural, works with an already strong outline." },
        { name: "Medium-length messy layers", why: "Irregular texture offsets sharp corners." },
        { name: "Side part with soft fade", why: "A gradual fade avoids adding more hard lines." },
        { name: "Short curls left loose on top", why: "Roundness up top balances the square jaw." },
      ],
      women: [
        { name: "Soft shoulder-grazing waves", why: "Curves counter the angular jaw." },
        { name: "Long layered shag", why: "Texture breaks up strong corners." },
        { name: "Wispy curtain bangs", why: "Softens a straight hairline." },
        { name: "Deep side-parted lob", why: "Diagonal lines slim the jaw." },
        { name: "Loose low bun with face-framing strands", why: "Keeps softness around the jawline." },
      ],
    },
  },
  {
    id: "heart",
    label: "Heart",
    description: "Wider forehead and cheekbones narrowing to a pointed chin.",
    traits: ["Broad forehead", "High cheekbones", "Narrow, tapered chin"],
    avoid: ["Heavy volume at the crown", "Very short blunt cuts above the cheekbone"],
    hairstyles: {
      men: [
        { name: "Medium-length fringe", why: "Reduces the visual width of the forehead." },
        { name: "Textured side-swept crop", why: "Adds asymmetry that balances a narrow chin." },
        { name: "Mid fade with loose top", why: "Keeps volume low and controlled." },
        { name: "Chin-length curtain cut", why: "Builds width near the jaw." },
        { name: "Light beard with short layered top", why: "The beard rounds out the pointed chin." },
      ],
      women: [
        { name: "Chin-length bob", why: "Adds fullness exactly where the face narrows." },
        { name: "Side-swept bangs", why: "Cuts down forehead width." },
        { name: "Long waves with volume below the ear", why: "Rebalances the top-heavy outline." },
        { name: "Textured shag with a soft fringe", why: "Distributes volume away from the crown." },
        { name: "Low side ponytail", why: "Keeps weight near the jaw." },
      ],
    },
  },
  {
    id: "diamond",
    label: "Diamond",
    description: "Narrow forehead and chin with the cheekbones as the widest point.",
    traits: ["Prominent cheekbones", "Narrow forehead", "Pointed chin"],
    avoid: ["Styles tucked tight behind the ears", "Extra volume at the cheekbones"],
    hairstyles: {
      men: [
        { name: "Textured fringe forward", why: "Adds width to a narrow forehead." },
        { name: "Medium length with side volume kept low", why: "Avoids widening the cheekbones further." },
        { name: "Quiff with soft edges", why: "Balances the top without sharpening the cheeks." },
        { name: "Longer layered top with tapered sides", why: "Elongates without side bulk." },
        { name: "Short beard with a crop cut", why: "Fills out the narrow chin area." },
      ],
      women: [
        { name: "Chin-length bob with a deep part", why: "Widens the jaw and narrows the cheeks." },
        { name: "Soft blunt bangs", why: "Balances a narrow forehead." },
        { name: "Long layers starting below the cheekbone", why: "Keeps volume away from the widest point." },
        { name: "Side-swept waves", why: "Creates a softer, more even outline." },
        { name: "Textured lob with tousled ends", why: "Adds fullness near the chin." },
      ],
    },
  },
  {
    id: "oblong",
    label: "Oblong / Rectangle",
    description: "Noticeably longer than it is wide, with a straight cheek line.",
    traits: ["Long face length", "Similar width top to bottom", "Often a longer forehead"],
    avoid: ["Tall volume on top", "Very long straight styles with no layers"],
    hairstyles: {
      men: [
        { name: "Short textured crop with fringe", why: "Shortens the forehead and avoids extra height." },
        { name: "Side part with medium sides", why: "Keeps width where it's needed." },
        { name: "Caesar cut", why: "The forward fringe visually shortens the face." },
        { name: "Wavy medium cut", why: "Side volume balances the length." },
        { name: "Buzz cut with a full beard", why: "Width at the jaw compensates for length." },
      ],
      women: [
        { name: "Blunt shoulder-length cut", why: "A horizontal line breaks the vertical." },
        { name: "Full straight bangs", why: "Cuts the face length immediately." },
        { name: "Wavy mid-length with side volume", why: "Adds width across the cheeks." },
        { name: "Curly bob", why: "Volume at the sides shortens the look of the face." },
        { name: "Soft layered lob with a middle part and waves", why: "Balances length with movement." },
      ],
    },
  },
  {
    id: "triangle",
    label: "Triangle / Pear",
    description: "Jawline wider than the cheekbones and forehead.",
    traits: ["Widest at the jaw", "Narrow forehead", "Softly tapering upper face"],
    avoid: ["Heavy hair sitting on the jaw", "Tight sides with no top volume"],
    hairstyles: {
      men: [
        { name: "Volume-on-top pompadour", why: "Balances a wide jaw with width up top." },
        { name: "Mid fade with textured quiff", why: "Slims the lower face while lifting the crown." },
        { name: "Messy top with short sides", why: "Shifts the visual weight upwards." },
        { name: "Side-swept volume", why: "Widens the forehead area." },
        { name: "Short back and sides with a full top", why: "Keeps the jaw uncluttered." },
      ],
      women: [
        { name: "Volume-rich lob above the jaw", why: "Keeps hair off the widest point." },
        { name: "Layered pixie with crown height", why: "Builds balance at the top of the head." },
        { name: "Side-swept bangs with a teased crown", why: "Widens the forehead visually." },
        { name: "Long waves starting at the cheekbone", why: "Draws the eye up and away from the jaw." },
        { name: "High ponytail with soft crown volume", why: "Lifts the whole silhouette." },
      ],
    },
  },
];

export const FACE_SHAPE_IDS = FACE_SHAPES.map((s) => s.id);

export function getShape(id: string) {
  return FACE_SHAPES.find((s) => s.id === id);
}
