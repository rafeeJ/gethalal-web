import { Divider } from "../components/Divider";
import { HeroLayout } from "../components/HeroLayout";
import { ImageGrid } from "../components/ImageGrid";
import Layout from "../components/Layout";
import { TopTitle } from "../components/TopTitle";

export default function Home() {
  return (
    <Layout>
      <TopTitle />
      <HeroLayout />
      <Divider />
      <ImageGrid />
    </Layout>
  )
}