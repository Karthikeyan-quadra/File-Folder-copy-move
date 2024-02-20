import { getSP } from "./pnpConfig";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/presets/all";

export const getAllFolders = async () => {
  try {
    const sp = getSP();
    const rootFolder = await sp.web.getFolderByServerRelativePath("RootFolder");
    const allFolders = await rootFolder.folders();
    const sortedFolders = await allFolders.sort((a: any, b: any) =>
      a.Name.localeCompare(b.Name)
    );
    return sortedFolders;
  } catch (error) {
    console.error("Error retrieving folders:", error);
  }
};

export const copyFolder = async (folder: any) => {
  const sp = getSP();
  const destinationUrl = `/sites/Fileupload/CopiedFolders/${folder.Name}`;
  await sp.web.rootFolder.folders
    .getByUrl("RootFolder")
    .folders.getByUrl(folder.Name)
    .copyByPath(destinationUrl, true);
};

export const moveFolder = async (folder: any) => {
  const sp = getSP();

  const destinationUrl = `/sites/Fileupload/MovedFolders/${folder.Name}`;
  await sp.web.rootFolder.folders
    .getByUrl("RootFolder")
    .folders.getByUrl(folder.Name)
    .moveByPath(destinationUrl, true);
};