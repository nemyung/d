import type { FileRejection } from "react-dropzone"

import _ from "lodash"
import { convertToByte, parseExtension } from "./utils"

/**
 *  @param {File} file 업로드된 파일
 *  @param {number} maxSize 허용되는 최대 용량(MB 단위)
 * */

export const shouldFileLessThanMaxSize = (file: File, maxSize: number) => {
  if (convertToByte(file.size) > maxSize) {
    throw new Error(`용량이 ${maxSize}MB를 초과합니다.`)
  }
}

/**
 * @param {File[]} files 업로드 된 파일들
 * */

export const shouldExist = (files: File[]) => {
  if (_.isNil(files[0])) {
    throw new Error(`유효한 파일이 존재하지 않습니다.`)
  }
}

/**
 * @param {File} file 업로드 된 파일
 * @param {string[]} mimeTypes 허용되는 mimeTypes
 *  - https://developer.mozilla.org/ko/docs/Web/HTML/Element/Input/file#%EA%B0%80%EB%8A%A5%ED%95%9C_%ED%8C%8C%EC%9D%BC_%EC%9C%A0%ED%98%95_%EC%A0%9C%ED%95%9C%ED%95%98%EA%B8%B0
 */
export const shouldFileSupportMimeTypes = (file: File, mimeTypes: string[]) => {
  console.log(file.type)
  const extension = parseExtension(file)

  if (
    !(
      _.includes(mimeTypes, file.type) || _.includes(mimeTypes, `.${extension}`)
    )
  ) {
    throw new Error(`허용 되지 않는 파일 형식입니다.`)
  }
}

export const shouldRefusedFilesNotExist = (
  fileRejections?: FileRejection[]
) => {
  if (_.isNil(fileRejections)) {
    return
  }

  if (fileRejections?.length > 0) {
    throw new Error(
      `${fileRejections
        .map((rejection) => rejection.file?.name)
        .join(", ")} - 허용 되지 않는 파일 형식입니다.`
    )
  }
}

type FileValidationParams = {
  files: File[]
  fileRejections: FileRejection[]
  sizeLimit: number
  mimeTypes: string[]
}

export const validateAll = ({
  files,
  fileRejections,
  sizeLimit,
  mimeTypes,
}: FileValidationParams) => {
  shouldRefusedFilesNotExist(fileRejections)
  shouldExist(files)
  files.forEach((file) => {
    validations.shouldFileLessThanMaxSize(file, sizeLimit)
    validations.shouldFileSupportMimeTypes(file, mimeTypes)
  })
}

export const validations = {
  shouldExist,
  shouldFileLessThanMaxSize,
  shouldFileSupportMimeTypes,
  shouldRefusedFilesNotExist,
  validateAll,
}
