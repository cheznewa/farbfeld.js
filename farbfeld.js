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
red   = ff[16+0+(8*(b+(a*w)))].charCodeAt();
green = ff[16+2+(8*(b+(a*w)))].charCodeAt();
blue  = ff[16+4+(8*(b+(a*w)))].charCodeAt();
alpha = ff[16+6+(8*(b+(a*w)))].charCodeAt();
document.write("<rect width=\"1\" height=\"1\" x=\""+b+"\" y=\""+a+"\" style=\"fill:rgba("+String(red)+","+String(green)+","+String(blue)+","+String(alpha)+");\"/>");
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
red   = ff[16+0+(8*(b+(a*w)))].charCodeAt();
green = ff[16+2+(8*(b+(a*w)))].charCodeAt();
blue  = ff[16+4+(8*(b+(a*w)))].charCodeAt();
alpha = ff[16+6+(8*(b+(a*w)))].charCodeAt();
if (mod == "add")
{
red   = red   + argv[0]
green = green + argv[1]
blue  = blue  + argv[2]
if (red > 255)
red = 255
if (green > 255)
green = 255
if (blue > 255)
blue = 255
}
if (mod == "sub")
{
red   = red   - argv[0]
green = green - argv[1]
blue  = blue  - argv[2]
if (red < 0)
red = 0
if (green < 0)
green = 0
if (blue < 0)
blue = 0
}
if (mod == "xor")
{
red   = red   ^ argv[0]
green = green ^ argv[1]
blue  = blue  ^ argv[2]
}
if (mod == "bnw")
{
var base = Math.floor((red+green+blue)/3)
red   = Math.floor(red*(1-(argv[0]/255)))+Math.floor(base*argv[0]/255)
green = Math.floor(green*(1-(argv[1]/255)))+Math.floor(base*argv[1]/255)
blue  = Math.floor(blue*(1-(argv[2]/255)))+Math.floor(base*argv[2]/255)
}
if (mod == "sep")
{
var baser = Math.floor((red+green+blue)/3)
var baseg = Math.floor((red+green+blue)/4)
var baseb = Math.floor((red+green)/6)
red   = Math.floor(red*(1-(argv[0]/255)))+Math.floor(baser*argv[0]/255)
green = Math.floor(green*(1-(argv[1]/255)))+Math.floor(baseg*argv[1]/255)
blue  = Math.floor(blue*(1-(argv[2]/255)))+Math.floor(baseb*argv[2]/255)
}
if (mod == "map")
{
z = []
for (var m=0;m<argv.length;m++)
{
var ar = parseInt(argv[m][0] + argv[m][1],16)
var ag = parseInt(argv[m][2] + argv[m][3],16)
var ab = parseInt(argv[m][4] + argv[m][5],16)
z = z.concat(Math.abs(red-ar)+Math.abs(green-ag)+Math.abs(blue-ab))
}
var d = 10000
for (var n=0;n<argv.length;n++)
{
if (z[n] < d)
{
d = z[n]
red = parseInt(argv[n][0] + argv[n][1],16)
green = parseInt(argv[n][2] + argv[n][3],16)
blue = parseInt(argv[n][4] + argv[n][5],16)
}
}
}
if (mod == "emp")
{
z = []
for (var m=0;m<argv.length;m++)
{
var ar = parseInt(argv[m][0] + argv[m][1],16)
var ag = parseInt(argv[m][2] + argv[m][3],16)
var ab = parseInt(argv[m][4] + argv[m][5],16)
z = z.concat(Math.abs(red-ar)+Math.abs(green-ag)+Math.abs(blue-ab))
}
var d = 10000
var ll = Math.floor(255.0/argv.length)
for (var n=0;n<argv.length;n++)
{
if (z[n] < d)
{
d = z[n]
r = n*ll
}
}
red = r
green = r
blue = r
}
if (mod == "dmp")
{
var m = Math.floor(red/Math.floor(255/argv.length))
var red = parseInt(argv[m][0] + argv[m][1],16)
var green = parseInt(argv[m][2] + argv[m][3],16)
var blue = parseInt(argv[m][4] + argv[m][5],16)
}
document.write("<rect width=\"1\" height=\"1\" x=\""+b+"\" y=\""+a+"\" style=\"fill:rgba("+String(red)+","+String(green)+","+String(blue)+","+String(alpha)+");\"/>");
}
}
document.write("</svg>");
}
else
{
document.write("Not A Farbfeld");
}
}
function render_farbfeld_ff2clear(ff,mod)
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
red   = ff[16+0+(8*(b+(a*w)))].charCodeAt();
green = ff[16+2+(8*(b+(a*w)))].charCodeAt();
blue  = ff[16+4+(8*(b+(a*w)))].charCodeAt();
alpha = ff[16+6+(8*(b+(a*w)))].charCodeAt();
if (b == 0)
{
var rr=red
var gg=green
var bb=blue
}
var dr=red-rr
var dg=green-gg
var db=blue-bb
var rv=red
var gv=green
var bv=blue
var d=Math.floor((dr+dg+db)/3)
if (mod == "rc")
{
if (d < 0)
{
rv = Math.min(red + Math.abs(d),255)
}
else if (d > 0)
{
rv = Math.max(red - Math.abs(d),0)
}
}
if (mod == "gm")
{
if (d < 0)
{
gv = Math.min(green + Math.abs(d),255)
}
else if (d > 0)
{
gv = Math.max(green - Math.abs(d),0)
}
}
if (mod == "by")
{
if (d < 0)
{
bv = Math.min(blue + Math.abs(d),255)
}
else if (d > 0)
{
bv = Math.max(blue - Math.abs(d),0)
}
}
if (mod == "cr")
{
if (d < 0)
{
gv = Math.min(green + Math.abs(d),255)
bv = Math.min(blue + Math.abs(d),255)
}
else if (d > 0)
{
gv = Math.max(green - Math.abs(d),0)
bv = Math.max(blue - Math.abs(d),0)
}
}
if (mod == "mg")
{
if (d < 0)
{
rv = Math.min(red + Math.abs(d),255)
bv = Math.min(blue + Math.abs(d),255)
}
else if (d > 0)
{
rv = Math.max(red - Math.abs(d),0)
bv = Math.max(blue - Math.abs(d),0)
}
}
if (mod == "yb")
{
if (d < 0)
{
rv = Math.min(red + Math.abs(d),255)
gv = Math.min(green + Math.abs(d),255)
}
else if (d > 0)
{
rv = Math.max(red - Math.abs(d),0)
gv = Math.max(green - Math.abs(d),0)
}
}
if (mod == "rgb")
{
if (d < 0)
{
rv = Math.min(red + Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.5))),255)
gv = Math.min(green + Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.25))),255)
bv = Math.min(blue + Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.125))),255)
}
else if (d > 0)
{
rv = Math.max(red - Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.5))),0)
gv = Math.max(green - Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.25))),0)
bv = Math.max(blue - Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.125))),0)
}
}
if (mod == "bgr")
{
if (d < 0)
{
rv = Math.min(red + Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.125))),255)
gv = Math.min(green + Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.25))),255)
bv = Math.min(blue + Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.5))),255)
}
else if (d > 0)
{
rv = Math.max(red - Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.125))),0)
gv = Math.max(green - Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.25))),0)
bv = Math.max(blue - Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.5))),0)
}
}
document.write("<rect width=\"1\" height=\"1\" x=\""+b+"\" y=\""+a+"\" style=\"fill:rgba("+String(rv)+","+String(gv)+","+String(bv)+","+String(alpha)+");\"/>");
rr=red
gg=green
bb=blue
}
}
document.write("</svg>");
}
else
{
document.write("Not A Farbfeld");
}
}