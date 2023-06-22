/* eslint-disable react-hooks/exhaustive-deps */
import { FileData, ListFileParams } from "@/types/DataObject";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { FileAPI } from "@/api";

const useFiles = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [filesLoading, setFilesLoading] = useState<boolean>(true);
  const [fileParam, setFileParam] = useState<ListFileParams>({
    userId: 0,
  });
  const { session } = useAuthentication();
  const loadFiles = () => {
    if (!fileParam.userId || !session || !session.accessToken) return;
    FileAPI.listFile(fileParam, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          setFiles(res.data.data);
          setFilesLoading(false);
          return;
        }
        setFiles([]);
        setFilesLoading(true);
      })
      .catch((error) => {
        setFiles([]);
        setFilesLoading(true);
      });
  };
  useEffect(() => {
    loadFiles();
  }, [session, fileParam]);
  return {
    files,
    setFiles,
    filesLoading,
    setFilesLoading,
    fileParam,
    setFileParam,
    loadFiles,
  };
};
export default useFiles;
