# Get Video Preview

Ref: https://stackoverflow.com/a/27148055

```bash
ffmpeg -i <input> -ss 00:00:01.000 -vframes 1 <output>
```

Example

```bash
ffmpeg -i input.mp4 -ss 00:00:01.000 -vframes 1 output.png
```

# Add Frame Number

Ref: https://write.corbpie.com/overlay-frame-number-on-video-with-ffmpeg/

```bash
ffmpeg -i <input> -vf "drawtext=fontfile=Arial.ttf:text='%{frame_num}':start_number=1:x=(w-tw)/2:y=h-(2*lh):fontcolor=red:fontsize=50:" -c:a copy <output>
```

Example

```bash
ffmpeg -i input.mp4 -vf "drawtext=fontfile=Arial.ttf:text='%{frame_num}':start_number=1:x=(w-tw)/2:y=h-(2*lh):fontcolor=red:fontsize=50:" -c:a copy output.mp4
```
