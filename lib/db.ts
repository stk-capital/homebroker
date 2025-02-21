import { promises as fs } from "fs"
import path from "path"

export async function readData<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), "data", filename)
  const data = await fs.readFile(filePath, "utf8")
  return JSON.parse(data)
}

export async function writeData<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(process.cwd(), "data", filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

