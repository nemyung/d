export const convertToByte = (megaBytes: number) => {
  const k = 1000
  return Number((megaBytes / k ** 2).toFixed(2))
}

export const parseExtension = (file: File): string => {
  const chunk = file.name.split(".")
  return chunk && chunk.length > 1 ? chunk[chunk.length - 1] : ""
}

export const readBase64URL = (file: File) =>
  new Promise<string>((res, rej) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      const { result } = fileReader

      if (typeof result === "string") {
        res(result)
        return
      }

      rej()
    }

    fileReader.onerror = rej
  })
