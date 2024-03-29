import dynamic from "next/dynamic";
const CreatePost = dynamic(() => import("@/components/CreatePost"));
const ListPost = dynamic(() => import("@/components/ListPost"));
import DocumentHead from "@/components/DocumentHead";
import Loader from "@/components/commons/Loader";
import { useCurrentProfile } from "@/hooks";
const MainLayout = dynamic(() => import("@/layouts/MainLayout"));
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
