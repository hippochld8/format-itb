import { getAllGaleriAlbums } from "@/db/queries";
import GaleriClient from "./GaleriClient";

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
  const galeriAlbums = await getAllGaleriAlbums();
  return <GaleriClient galeriAlbums={galeriAlbums} />;
}
