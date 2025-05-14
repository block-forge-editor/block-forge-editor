import type { FC } from "react";
import { useId } from "react";

import { CONSTRUCTOR_EDITOR_TOOLS } from "../constants/tools";
import { useEditor } from "../hooks/use-editor";

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
      <div className="mx-auto m-8 h-screen app-scroll overflow-auto shadow-md rounded-lg w-[70%] bg-white">
        <div id={`editorjs-${id}`} />
      </div>
    </>
  );
};
