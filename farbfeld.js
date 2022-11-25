function render_farbfeld(ff)
{
var red;
var green;
var blue;
var alpha;
if (102 == ff[0].charCodeAt() && 97 == ff[1].charCodeAt() && 114 == ff[2].charCodeAt() && 98 == ff[3].charCodeAt() && 102 == ff[4].charCodeAt() && 101 == ff[5].charCodeAt() && 108 == ff[6].charCodeAt() && 100 == ff[7].charCodeAt())
{
var w = (ff[8].charCodeAt()*16777216)+(ff[9].charCodeAt()*65536)+(ff[10].charCodeAt()*256)+(ff[11].charCodeAt());
var h = (ff[12].charCodeAt()*16777216)+(ff[13].charCodeAt()*65536)+(ff[14].charCodeAt()*256)+(ff[15].charCodeAt());
document.write("<svg width=\""+w+"\" height=\""+h+"\">");
for (var a=0;a<h;a++)
{
for (var b=0;b<w;b++)
{
red   = String(ff[16+0+(8*(b+(a*w)))].charCodeAt());
green = String(ff[16+2+(8*(b+(a*w)))].charCodeAt());
blue  = String(ff[16+4+(8*(b+(a*w)))].charCodeAt());
alpha = String(ff[16+6+(8*(b+(a*w)))].charCodeAt());
document.write("<rect width=\"1\" height=\"1\" x=\""+b+"\" y=\""+a+"\" style=\"fill:rgba("+red+","+green+","+blue+","+alpha+");\"/>");
}
}
document.write("</svg>");
}
else
{
document.write("Not A Farbfeld");
}
}
function render_farbfeld_coloreffectreplacer(ff,mod,argv)
{
var red;
var green;
var blue;
var alpha;
if (102 == ff[0].charCodeAt() && 97 == ff[1].charCodeAt() && 114 == ff[2].charCodeAt() && 98 == ff[3].charCodeAt() && 102 == ff[4].charCodeAt() && 101 == ff[5].charCodeAt() && 108 == ff[6].charCodeAt() && 100 == ff[7].charCodeAt())
{
var w = (ff[8].charCodeAt()*16777216)+(ff[9].charCodeAt()*65536)+(ff[10].charCodeAt()*256)+(ff[11].charCodeAt());
var h = (ff[12].charCodeAt()*16777216)+(ff[13].charCodeAt()*65536)+(ff[14].charCodeAt()*256)+(ff[15].charCodeAt());
document.write("<svg width=\""+w+"\" height=\""+h+"\">");
for (var a=0;a<h;a++)
{
for (var b=0;b<w;b++)
{
red   = String(ff[16+0+(8*(b+(a*w)))].charCodeAt());
green = String(ff[16+2+(8*(b+(a*w)))].charCodeAt());
blue  = String(ff[16+4+(8*(b+(a*w)))].charCodeAt());
alpha = String(ff[16+6+(8*(b+(a*w)))].charCodeAt());
if (mod == "add")
{
red   = Number(red)   + argv[0]
green = Number(green) + argv[1]
blue  = Number(blue)  + argv[2]
if (red > 255)
red = 255
if (green > 255)
green = 255
if (blue > 255)
blue = 255
}
if (mod == "sub")
{
red   = Number(red)   - argv[0]
green = Number(green) - argv[1]
blue  = Number(blue)  - argv[2]
if (red < 0)
red = 0
if (green < 0)
green = 0
if (blue < 0)
blue = 0
}
if (mod == "xor")
{
red   = Number(red)   ^ argv[0]
green = Number(green) ^ argv[1]
blue  = Number(blue)  ^ argv[2]
}
if (mod == "bnw")
{
var base = Math.floor((Number(red)+Number(green)+Number(blue))/3)
red   = Math.floor(red*(1-(argv[0]/255)))+Math.floor(base*argv[0]/255)
green = Math.floor(green*(1-(argv[1]/255)))+Math.floor(base*argv[1]/255)
blue  = Math.floor(blue*(1-(argv[2]/255)))+Math.floor(base*argv[2]/255)
}
if (mod == "sep")
{
var baser = Math.floor((Number(red)+Number(green)+Number(blue))/3)
var baseg = Math.floor((Number(red)+Number(green)+Number(blue))/4)
var baseb = Math.floor((Number(red)+Number(green))/6)
red   = Number(Math.floor(red*(1-(argv[0]/255))))+Number(Math.floor(baser*argv[0]/255))
green = Number(Math.floor(green*(1-(argv[1]/255))))+Number(Math.floor(baseg*argv[1]/255))
blue  = Number(Math.floor(blue*(1-(argv[2]/255))))+Number(Math.floor(baseb*argv[2]/255))
}
document.write("<rect width=\"1\" height=\"1\" x=\""+b+"\" y=\""+a+"\" style=\"fill:rgba("+red+","+green+","+blue+","+alpha+");\"/>");
}
}
document.write("</svg>");
}
else
{
document.write("Not A Farbfeld");
}
}