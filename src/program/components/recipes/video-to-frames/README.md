# Video To Frames

Ref: https://stackoverflow.com/questions/34786669/extract-all-video-frames-as-images-with-ffmpeg

```bash
ffmpeg -i <input> "%01d.png"
```

Example

```bash
ffmpeg -i input.mp4 "./frames/%01d.png"
```