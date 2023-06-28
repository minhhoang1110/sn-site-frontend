import CreatePost from "@/components/CreatePost";
import DocumentHead from "@/components/DocumentHead";
import ListPost from "@/components/ListPost";
import Loader from "@/components/Loader";
import { useCurrentProfile } from "@/hooks";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
const Home: React.FC = () => {
  const { profile, loadingProfile } = useCurrentProfile();
  if (loadingProfile) return <Loader width="w-screen" height="h-screen" />;
  return (
    <MainLayout user={profile || null}>
      <div className="mt-14 py-3">
        <DocumentHead />
        <CreatePost user={profile || null} />
        <ListPost />
      </div>
    </MainLayout>
  );
};
export default Home;
