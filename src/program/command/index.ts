import * as path from "path";
import * as fs from "fs-extra";
import * as childProcess from "child_process";

const exePath = process.cwd();
const ffmpeg = path.resolve(exePath, "./lib/ffmpeg.exe");
const tempDir = path.resolve(exePath, `./temp`);

function getTempImagePath() {
	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir);
	}
	return path.resolve(tempDir, `./${Date.now()}.png`);
}

function readImage(imgPath: string) {
	return fs.readFileSync(imgPath);
}

// ffmpeg -i <input> -ss 00:00:01.000 -vframes 1 <output>
export async function getVideoPreview(inputPath: string): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		//
		const temp = getTempImagePath();
		// prettier-ignore
		const args = [
			`-hide_banner`, 
			`-i ${inputPath}`, 
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
	inputPath: string;
}

export async function addFrameNumber(config: IAddFrameNumberConfig): Promise<string> {
	const { inputPath } = config;

	return new Promise((resolve, reject) => {
		//
		const fileExtension = path.extname(inputPath);
		const fileName = path.basename(inputPath, fileExtension);
		const fileDir = path.dirname(inputPath);
		const outputPath = path.resolve(fileDir, `./${fileName}-with-frames${fileExtension}`);
		if (fs.existsSync(outputPath)) {
			fs.removeSync(outputPath);
		}

		// prettier-ignore
		const args = [
			`-hide_banner`, 
			`-i ${inputPath}`, 
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
				resolve(outputPath);
			}
		});
	});
}

// ffmpeg -i <input> "%01d.png"
export interface IVideoToFramesConfig {
	inputPath: string;
}

export async function videoToFrames(config: IVideoToFramesConfig): Promise<string> {
	const { inputPath } = config;

	return new Promise((resolve, reject) => {
		//
		const fileExtension = path.extname(inputPath);
		const fileName = path.basename(inputPath, fileExtension);
		const fileDir = path.dirname(inputPath);
		const outputDir = path.resolve(fileDir, `./${fileName}-frames`);
		if (fs.existsSync(outputDir)) {
			fs.removeSync(outputDir);
		}

		fs.ensureDirSync(outputDir);

		// prettier-ignore
		const args = [
			`-hide_banner`, 
			`-i ${inputPath}`, 
			path.resolve(`${outputDir}`, "./%01d.png")
		].join(" ");

		//
		const command = `"${ffmpeg}" ${args}`;
		// console.log(command);
		childProcess.exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(error);
				reject(error);
			} else {
				resolve(outputDir);
			}
		});
	});
}
