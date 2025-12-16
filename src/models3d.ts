/**
 * HOW TO ADD A NEW 3D MODEL:
 * 
 * 1. Place your 3D file in the /public/models/ folder
 *    (e.g., /public/models/my-part.stl)
 * 2. Add a new object to the models3d array below
 * 3. Required fields:
 *    - slug: URL-friendly name (e.g., "robot-arm-part")
 *    - title: Display name
 *    - shortDescription: Brief summary (shown in sidebar)
 *    - content: Markdown-like text description
 *    - fileUrl: Path to file in /public (e.g., "/models/my-part.stl")
 *    - fileFormat: File type (e.g., "STL", "OBJ", "GLB")
 * 
 * Example:
 * {
 *   slug: "robot-gripper",
 *   title: "Robot Gripper",
 *   shortDescription: "3D printed gripper for robot arm.",
 *   content: `# Robot Gripper\n\nThis gripper was designed for...`,
 *   fileUrl: "/models/robot-gripper.stl",
 *   fileFormat: "STL",
 * }
 */

export type Model3D = {
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  fileUrl: string; // Path to the 3D file (e.g., .stl, .obj, .glb)
  fileFormat: string; // e.g., "STL", "OBJ", "GLB"
};

export const models3d: Model3D[] = [
  {
    slug: "wallMount",
    title: "Pokemon card display wall mount",
    shortDescription: "pokemon card stand that you can put side to side with same stands and you can attach it to wall with screw or tape.",
    content: ``,
    fileUrl: "/models/wallMount.stl",
    fileFormat: "STL",
  },
];

export function getModel3DBySlug(slug: string): Model3D | undefined {
  return models3d.find((m) => m.slug === slug);
}

