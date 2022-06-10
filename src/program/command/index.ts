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
		// prettier-ignore
		const args = [
			`-hide_banner`, 
			`-i ${videoPath}`, 
			`-ss 00:00:01.000`, 
			`-vframes 1`,
			 temp
		].join(" ");

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

// ffmpeg -i <input> -vf "drawtext=fontfile=Arial.ttf:text='%{frame_num}':start_number=1:x=(w-tw)/2:y=h-(2*lh):fontcolor=red:fontsize=50:" -c:a copy <output>
export interface IAddFrameNumberConfig {
	videoPath: string;
}

export async function addFrameNumber(config: IAddFrameNumberConfig): Promise<Boolean> {
	const { videoPath } = config;

	return new Promise((resolve, reject) => {
		//
		const fileExtension = path.extname(videoPath);
		const fileName = path.basename(videoPath, fileExtension);
		const fileDir = path.dirname(videoPath);
		const outputPath = path.resolve(fileDir, `./${fileName}.with-frames${fileExtension}`);

		// prettier-ignore
		const args = [
			`-hide_banner`, 
			`-i ${videoPath}`, 
			`-vf "drawtext=fontfile=Arial.ttf:text='%{frame_num}':start_number=1:x=(w-tw)/2:y=h-(2*lh):fontcolor=red:fontsize=50:" -c:a copy`, 
			outputPath
		].join(" ");

		//
		const command = `"${ffmpeg}" ${args}`;
		// console.log(command);
		childProcess.exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			} else {
				resolve(true);
			}
		});
	});
}
