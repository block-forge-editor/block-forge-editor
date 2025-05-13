import type { FC } from "react";
import { useId } from "react";

import { CONSTRUCTOR_EDITOR_TOOLS } from "../constants/tools";
import { useEditor } from "../hooks/use-editor";

import {
  Menubar,
  MenubarSub,
  MenubarMenu,
  MenubarItem,
  MenubarTrigger,
  MenubarContent,
  MenubarShortcut,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarRadioGroup,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarCheckboxItem,
} from "@/shared/ui/shadcn/ui/menubar";

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      id: "0",
      type: "header",
      data: {
        level: 1,
        text: "",
      },
    },
    {
      id: "1",
      type: "paragraph",
      data: {
        text: "",
      },
    },
    {
      id: "3",
      type: "accordion",
      data: {
        title: "",
        content: "",
      },
    },
  ],
};

export const Renderer: FC = () => {
  const id = useId();

  // const ejInstance =
  useEditor({
    tools: CONSTRUCTOR_EDITOR_TOOLS,
    id: `editorjs-${id}`,
    initialData: DEFAULT_INITIAL_DATA,
    // onChange: updateContent,
  });

  // const handleSubmit = useCallback(
  //   async (content?: OutputData) => {
  //     return new Promise<OutputData>((resolve) => {
  //       if (content) {
  //         resolve(content);
  //       } else {
  //         void ejInstance.current?.save().then((content) => {
  //           resolve(content);
  //         });
  //       }
  //     });
  //   },
  //   [ejInstance],
  // );

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              Always Show Full URLs
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem>Edit...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Add Profile...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="mx-auto m-8 h-screen app-scroll overflow-auto shadow-md rounded-lg w-[70%] bg-white">
        <div id={`editorjs-${id}`} />
      </div>
    </>
  );
};
