import * as path from "path";
import * as fs from "fs-extra";
import * as childProcess from "child_process";
import { rootPath } from "../../common";

const ffmpeg = path.resolve(rootPath, "./lib/ffmpeg.exe");
const tempDir = path.resolve(__dirname, `./temp`);
if (!fs.existsSync(tempDir)) {
	fs.mkdirSync(tempDir);
}

function getTempImagePath() {
	return path.resolve(tempDir, `./${Date.now()}.png`);
}

function readImage(imgPath: string) {
	return fs.readFileSync(imgPath);
}

// ffmpeg -i <input> -ss 00:00:01.000 -vframes 1 <output>
export async function getVideoPreview(videoPath: string): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		//
		const temp = getTempImagePath();
		const args = [`-hide_banner`, `-i ${videoPath}`, `-ss 00:00:01.000`, `-vframes 1`, temp].join(" ");

		//
		const command = `"${ffmpeg}" ${args}`;
		// console.log(command);
		childProcess.exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			} else {
				const buffer = readImage(temp);
				fs.removeSync(temp);
				resolve(buffer);
			}
		});
	});
}
