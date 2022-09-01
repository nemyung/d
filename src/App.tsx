import type { FileRejection } from "react-dropzone"

import { useDropzone } from "react-dropzone"
import { useState, useCallback } from "react"

import { readBase64URL } from "./utils"
import { validations } from "./validation"

const SIZE_LIMIT = 1
const FILE_MIME_TYPE = [
  /* IMAGE */
  ...["image/jpeg", "image/png", ".png", ".jpg"],
  /* pdf, ppt, zip */
  ...[
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/zip",
    "application/x-zip-compressed",
    "multipart/x-zip",
    "application/haansoftpptx",
    " application/haansoftpdf",
    ".ppt",
    ".pptx",
    ".pdf",
    ".zip",
  ],
  /* hwp: your choice */
]

interface File {
  id: string
  accessUrl: string
  name: string
}

function App() {
  /**
   * 1. 예상될 수 있는 params
   *  - mimetype
   *  - filesize
   *  - mulitple: boolean;
   *  - async function that is used to request server(File upload api)
   *  - onSuccessFunction
   *  - onFailureFunction
   *
   *  2. Returns: getInputProps, getRootProps from react-dropzone
   * */

  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      console.log({ acceptedFiles })
      console.log({ fileRejections })

      try {
        /**
         *
         * VALIDATION LOGICS
         *
         * */
        // validations.validateAll({
        //   files: acceptedFiles,
        //   fileRejections,
        //   sizeLimit: SIZE_LIMIT,
        //   mimeTypes: FILE_MIME_TYPE,
        // })
      } catch (error: unknown) {
        /**
         *
         * VALIDATION CATCH
         *
         *
         * */
        console.error(error)
        return
      }

      // const file = acceptedFiles[0] as File;
      // const base64URL = await readBase64URL(file);

      try {
        /**
         * ASYNC OPERATIONS
         *
         *
         *
         * onSuccessFunction can be used within here
         * */
      } catch (error: unknown) {
        /**
         * ASYNC OPERATIONS CATCH CLAUSE..
         *
         *
         * onFailureFunction can be used within here
         * */
      }
    },
    [files]
  )

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    noDrag: true,
    noKeyboard: true,
    multiple: false,
    maxFiles: 1,
    // pdf, ppt, zip, image files
    accept: {
      "application/pdf": [],
      "application/vnd.ms-powerpoint": [],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [],
      "application/zip": [],
      "application/x-zip-compressed": [],
      "multipart/x-zip": [],
      "application/haansoftpptx": [],
      "application/haansoftpdf": [],
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  })

  return <div className="App"></div>
}

export default App
