function render_farbfeld_coloreffectreplacer(ff,name,mod,argv)
{
var red;
var green;
var blue;
var alpha;
if (102 == ff[0].charCodeAt() && 97 == ff[1].charCodeAt() && 114 == ff[2].charCodeAt() && 98 == ff[3].charCodeAt() && 102 == ff[4].charCodeAt() && 101 == ff[5].charCodeAt() && 108 == ff[6].charCodeAt() && 100 == ff[7].charCodeAt())
{
var w = (ff[8].charCodeAt()*16777216)+(ff[9].charCodeAt()*65536)+(ff[10].charCodeAt()*256)+(ff[11].charCodeAt());
var h = (ff[12].charCodeAt()*16777216)+(ff[13].charCodeAt()*65536)+(ff[14].charCodeAt()*256)+(ff[15].charCodeAt());
var c = document.getElementById(name);
var cont = c.getContext('2d');
var imgdata = cont.createImageData(w,h);
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
if (mod == "ppr")
{
var hr = parseInt(argv[0][0] + argv[0][1],16)
var hg = parseInt(argv[0][2] + argv[0][3],16)
var hb = parseInt(argv[0][4] + argv[0][5],16)
// Source From ::::::: https://www.rapidtables.com/convert/color/rgb-to-cmyk.html
k = 1-Math.max((red/255),(green/255),(blue/255))
if (k !== 1)
{
var c = (1-(red/255)-k)/(1-k)
var m = (1-(green/255)-k)/(1-k)
var y = (1-(blue/255)-k)/(1-k)
}
else
{
var c = 0
var m = 0
var y = 0
}
// End Source
var z = Math.max(Math.floor(k*255),Math.floor(c*255),Math.floor(m*255),Math.floor(y*255))
red = Math.max(red-Math.floor((255-hr)*((255-z)/255)),0)
green = Math.max(green-Math.floor((255-hg)*((255-z)/255)),0)
blue = Math.max(blue-Math.floor((255-hb)*((255-z)/255)),0)
}
if (mod == "ipr")
{
var hr = parseInt(argv[0][0] + argv[0][1],16)
var hg = parseInt(argv[0][2] + argv[0][3],16)
var hb = parseInt(argv[0][4] + argv[0][5],16)
var ir = parseInt(argv[1][0] + argv[1][1],16)
var ig = parseInt(argv[1][2] + argv[1][3],16)
var ib = parseInt(argv[1][4] + argv[1][5],16)
// Source From ::::::: https://www.rapidtables.com/convert/color/rgb-to-cmyk.html
k = 1-Math.max((red/255),(green/255),(blue/255))
if (k !== 1)
{
var c = (1-(red/255)-k)/(1-k)
var m = (1-(green/255)-k)/(1-k)
var y = (1-(blue/255)-k)/(1-k)
}
else
{
var c = 0
var m = 0
var y = 0
}
// End Source
var z = Math.max(Math.floor(k*255),Math.floor(c*255),Math.floor(m*255),Math.floor(y*255))
red = Math.max(Math.floor(k*ir)+red-Math.floor((255-hr)*((255-z)/255.0)),0)
green = Math.max(Math.floor(k*ig)+green-Math.floor((255-hg)*((255-z)/255.0)),0)
blue = Math.max(Math.floor(k*ib)+blue-Math.floor((255-hb)*((255-z)/255.0)),0)
}
if (mod == "gam")
{
red = Math.floor(Math.pow(red/255,1/argv[0])*255)
green = Math.floor(Math.pow(green/255,1/argv[1])*255)
blue = Math.floor(Math.pow(blue/255,1/argv[2])*255)
}
if (mod == "col")
{
br = parseInt(argv[0][0] + argv[0][1],16)
bg = parseInt(argv[0][2] + argv[0][3],16)
bb = parseInt(argv[0][4] + argv[0][5],16)
red = Math.floor(red*(1-(argv[1]/255)))+Math.floor(br*argv[1]/255)
green = Math.floor(green*(1-(argv[2]/255)))+Math.floor(bg*argv[2]/255)
blue = Math.floor(blue*(1-(argv[3]/255)))+Math.floor(bb*argv[3]/255)
}
if (mod == "pos")
{
red = Math.floor(red/Math.floor(255/argv[0]))*Math.floor(255/argv[0])
green = Math.floor(green/Math.floor(255/argv[1]))*Math.floor(255/argv[1])
blue = Math.floor(blue/Math.floor(255/argv[2]))*Math.floor(255/argv[2])
}
if (mod == "lum")
{
red = Math.floor(Math.max(Math.min(red+(argv[3]*(red-argv[0])),255),0))
green = Math.floor(Math.max(Math.min(green+(argv[4]*(green-argv[1])),255),0))
blue = Math.floor(Math.max(Math.min(blue+(argv[5]*(blue-argv[2])),255),0))
}
if (mod == "shu")
{
red = Math.min(((Math.floor(red*((255-argv[0])/255.0))+Math.floor(red*((255-argv[1])/255.0)))/2)+((Math.floor(green*((argv[2])/255.0))+Math.floor(blue*((argv[4])/255.0)))/2),255)
green = Math.min(((Math.floor(green*((255-argv[2])/255.0))+Math.floor(green*((255-argv[3])/255.0)))/2)+((Math.floor(red*((argv[0])/255.0))+Math.floor(blue*((argv[5])/255.0)))/2),255)
blue = Math.min(((Math.floor(blue*((255-argv[4])/255.0))+Math.floor(blue*((255-argv[5])/255.0)))/2)+((Math.floor(red*((argv[1])/255.0))+Math.floor(green*((argv[3])/255.0)))/2),255)
}
if (mod == "old")
{
var base = Math.floor((red+green+blue)/3)
var t = Math.min(Math.floor((Math.floor(Date.now()/1000)-argv[0])/argv[1]),511)
if (t < 256)
{
red   = Math.floor(red*(1-(t/255)))+Math.floor(base*t/255)
green = Math.floor(green*(1-(t/255)))+Math.floor(base*t/255)
blue  = Math.floor(blue*(1-(t/255)))+Math.floor(base*t/255)
}
else
{
red = Math.floor(base/Math.floor(255/(255-(t-255))))*Math.floor(255.0/(255-(t-255)))
green = Math.floor(base/Math.floor(255/(255-(t-255))))*Math.floor(255.0/(255-(t-255)))
blue = Math.floor(base/Math.floor(255/(255-(t-255))))*Math.floor(255.0/(255-(t-255)))
}
}
if (mod == "rmp")
{
var ar = parseInt(argv[0][0] + argv[0][1],16)
var ag = parseInt(argv[0][2] + argv[0][3],16)
var ab = parseInt(argv[0][4] + argv[0][5],16)
var br = parseInt(argv[1][0] + argv[1][1],16)
var bg = parseInt(argv[1][2] + argv[1][3],16)
var bb = parseInt(argv[1][4] + argv[1][5],16)
var z = Math.max(argv[2]-(Math.abs(red-ar)+Math.abs(green-ag)+Math.abs(blue-ab)),0)
red = Math.floor(red*(1-(z/argv[2])))+Math.floor(br*(z/argv[2]))
green = Math.floor(green*(1-(z/argv[2])))+Math.floor(bg*(z/argv[2]))
blue = Math.floor(blue*(1-(z/argv[2])))+Math.floor(bb*(z/argv[2]))
}
if (mod == "rnd")
{
var ar = parseInt(argv[0][0] + argv[0][1],16)
var ag = parseInt(argv[0][2] + argv[0][3],16)
var ab = parseInt(argv[0][4] + argv[0][5],16)
var br = Math.floor(Math.random()*256)
var bg = Math.floor(Math.random()*256)
var bb = Math.floor(Math.random()*256)
var z = Math.max(argv[1]-(Math.abs(red-ar)+Math.abs(green-ag)+Math.abs(blue-ab)),0)
red = Math.floor(red*(1-(z/argv[1])))+Math.floor(br*(z/argv[1]))
green = Math.floor(green*(1-(z/argv[1])))+Math.floor(bg*(z/argv[1]))
blue = Math.floor(blue*(1-(z/argv[1])))+Math.floor(bb*(z/argv[1]))
}
if (mod == "dpr")
{
// Source From ::::::: https://www.rapidtables.com/convert/color/rgb-to-cmyk.html
k = 1-Math.max((red/255),(green/255),(blue/255))
if (k !== 1)
{
var c = (1-(red/255)-k)/(1-k)
var m = (1-(green/255)-k)/(1-k)
var y = (1-(blue/255)-k)/(1-k)
}
else
{
var c = 0
var m = 0
var y = 0
}
// End Source
k = (Math.floor(argv[0])/255)*k
c = (Math.floor(argv[1])/255)*c
m = (Math.floor(argv[2])/255)*m
y = (Math.floor(argv[3])/255)*y
// Source From ::::::: https://www.rapidtables.com/convert/color/cmyk-to-rgb.html
red   = Math.floor(255*((1-c)*(1-k)))
green = Math.floor(255*((1-m)*(1-k)))
blue  = Math.floor(255*((1-y)*(1-k)))
// End Source
}
if (mod == "uni")
{
var br = parseInt(argv[0][0] + argv[0][1],16)
var bg = parseInt(argv[0][2] + argv[0][3],16)
var bb = parseInt(argv[0][4] + argv[0][5],16)
var base = Math.floor((red+green+blue)/3)
red   = Math.floor(base*(br/255))
green = Math.floor(base*(bg/255))
blue  = Math.floor(base*(bb/255))
}
imgdata.data[4*((a*w)+b)+0] = red;
imgdata.data[4*((a*w)+b)+1] = green;
imgdata.data[4*((a*w)+b)+2] = blue;
imgdata.data[4*((a*w)+b)+3] = alpha;
}
}
cont.putImageData(imgdata,0,0);
}
else
{
throw "Not A Farbfeld For "+name+" !"
}
}
function render_farbfeld_ff2clear(ff,name,mod)
{
var red;
var green;
var blue;
var alpha;
if (102 == ff[0].charCodeAt() && 97 == ff[1].charCodeAt() && 114 == ff[2].charCodeAt() && 98 == ff[3].charCodeAt() && 102 == ff[4].charCodeAt() && 101 == ff[5].charCodeAt() && 108 == ff[6].charCodeAt() && 100 == ff[7].charCodeAt())
{
var w = (ff[8].charCodeAt()*16777216)+(ff[9].charCodeAt()*65536)+(ff[10].charCodeAt()*256)+(ff[11].charCodeAt());
var h = (ff[12].charCodeAt()*16777216)+(ff[13].charCodeAt()*65536)+(ff[14].charCodeAt()*256)+(ff[15].charCodeAt());
var c = document.getElementById(name);
var cont = c.getContext('2d');
var imgdata = cont.createImageData(w,h);
for (var a=0;a<h;a++)
{
for (var b=0;b<w;b++)
{
red   = ff[16+0+(8*(b+(a*w)))].charCodeAt();
green = ff[16+2+(8*(b+(a*w)))].charCodeAt();
blue  = ff[16+4+(8*(b+(a*w)))].charCodeAt();
alpha = ff[16+6+(8*(b+(a*w)))].charCodeAt();
imgdata.data[4*((a*w)+b)+0] = red;
imgdata.data[4*((a*w)+b)+1] = green;
imgdata.data[4*((a*w)+b)+2] = blue;
imgdata.data[4*((a*w)+b)+3] = alpha;
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
if (mod == "rb")
{
if (d < 0)
{
rv = Math.min(red + Math.abs(d),255)
gv = green
bv = Math.max(blue - Math.abs(d),0)
}
else if (d > 0)
{
rv = Math.max(red - Math.abs(d),0)
gv = green
bv = Math.min(blue + Math.abs(d),255)
}
}
if (mod == "br")
{
if (d < 0)
{
rv = Math.max(red - Math.abs(d),0)
gv = green
bv = Math.min(blue + Math.abs(d),255)
}
else if (d > 0)
{
rv = Math.min(red + Math.abs(d),255)
gv = green
bv = Math.max(blue - Math.abs(d),0)
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
if (mod == "rgb+")
{
if (d < 0)
{
rv = Math.min(red + (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.5))-Math.floor(d/1))),255)
gv = Math.min(green + (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.25))-Math.floor(d/2))),255)
bv = Math.min(blue + (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.125))-Math.floor(d/3))),255)
}
else if (d > 0)
{
rv = Math.max(red - (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.5))+Math.floor(d/1))),0)
gv = Math.max(green - (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.25))+Math.floor(d/2))),0)
bv = Math.max(blue - (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.125))+Math.floor(d/3))),0)
}
}
if (mod == "bgr+")
{
if (d < 0)
{
rv = Math.min(red + (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.125))-Math.floor(d/3))),255)
gv = Math.min(green + (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.25))-Math.floor(d/2))),255)
bv = Math.min(blue + (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.5))-Math.floor(d/1))),255)
}
else if (d > 0)
{
rv = Math.max(red - (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.125))+Math.floor(d/3))),0)
gv = Math.max(green - (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.25))+Math.floor(d/2))),0)
bv = Math.max(blue - (Math.floor(255*(Math.sin(Math.abs(d)/255)*(Math.PI*0.5))+Math.floor(d/1))),0)
}
}
imgdata.data[4*((a*w)+b)+0] = rv;
imgdata.data[4*((a*w)+b)+1] = gv;
imgdata.data[4*((a*w)+b)+2] = bv;
imgdata.data[4*((a*w)+b)+3] = alpha;
rr=red
gg=green
bb=blue
}
}
cont.putImageData(imgdata,0,0);
}
else
{
throw "Not A Farbfeld For "+name+" !"
}
}
function render_farbfeld_clear2ff(ff,name,mod)
{
var red;
var green;
var blue;
var alpha;
if (102 == ff[0].charCodeAt() && 97 == ff[1].charCodeAt() && 114 == ff[2].charCodeAt() && 98 == ff[3].charCodeAt() && 102 == ff[4].charCodeAt() && 101 == ff[5].charCodeAt() && 108 == ff[6].charCodeAt() && 100 == ff[7].charCodeAt())
{
var w = (ff[8].charCodeAt()*16777216)+(ff[9].charCodeAt()*65536)+(ff[10].charCodeAt()*256)+(ff[11].charCodeAt());
var h = (ff[12].charCodeAt()*16777216)+(ff[13].charCodeAt()*65536)+(ff[14].charCodeAt()*256)+(ff[15].charCodeAt());
var c = document.getElementById(name);
var cont = c.getContext('2d');
var imgdata = cont.createImageData(w,h);
for (var a=0;a<h;a++)
{
for (var b=0;b<w;b++)
{
red   = ff[16+0+(8*(b+(a*w)))].charCodeAt();
green = ff[16+2+(8*(b+(a*w)))].charCodeAt();
blue  = ff[16+4+(8*(b+(a*w)))].charCodeAt();
alpha = ff[16+6+(8*(b+(a*w)))].charCodeAt();
var rv=red
var gv=green
var bv=blue
if (mod == "rc")
{
var d=red-Math.floor((green+blue)/2)
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
var d=green-Math.floor((red+blue)/2)
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
var d=blue-Math.floor((red+green)/2)
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
var d=Math.floor((green+blue)/2)-red
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
var d=Math.floor((red+blue)/2)-green
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
var d=Math.floor((red+green)/2)-blue
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
imgdata.data[4*((a*w)+b)+0] = rv;
imgdata.data[4*((a*w)+b)+1] = gv;
imgdata.data[4*((a*w)+b)+2] = bv;
imgdata.data[4*((a*w)+b)+3] = alpha;
}
}
cont.putImageData(imgdata,0,0);
}
else
{
throw "Not A Farbfeld For "+name+" !"
}
}
function render_farbfeld_ff2clear_custom(ff,name,a,b)
{
var ra = parseInt(a[0] + a[1],16)
var ga = parseInt(a[2] + a[3],16)
var ba = parseInt(a[4] + a[5],16)
var rb = parseInt(b[0] + b[1],16)
var gb = parseInt(b[2] + b[3],16)
var bc = parseInt(b[4] + b[5],16)
var red;
var green;
var blue;
var alpha;
if (102 == ff[0].charCodeAt() && 97 == ff[1].charCodeAt() && 114 == ff[2].charCodeAt() && 98 == ff[3].charCodeAt() && 102 == ff[4].charCodeAt() && 101 == ff[5].charCodeAt() && 108 == ff[6].charCodeAt() && 100 == ff[7].charCodeAt())
{
var w = (ff[8].charCodeAt()*16777216)+(ff[9].charCodeAt()*65536)+(ff[10].charCodeAt()*256)+(ff[11].charCodeAt());
var h = (ff[12].charCodeAt()*16777216)+(ff[13].charCodeAt()*65536)+(ff[14].charCodeAt()*256)+(ff[15].charCodeAt());
var c = document.getElementById(name);
var cont = c.getContext('2d');
var imgdata = cont.createImageData(w,h);
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
if (d < 0)
{
rv = Math.min(red + (Math.floor((ra/255)*Math.abs(d))),255)
gv = Math.min(green + (Math.floor((ga/255)*Math.abs(d))),255)
bv = Math.min(blue + (Math.floor((ba/255)*Math.abs(d))),255)
}
else if (d > 0)
{
rv = Math.max(red - (Math.floor((1-(rb/255))*(Math.abs(d)))),0)
gv = Math.max(green - (Math.floor((1-(gb/255))*(Math.abs(d)))),0)
bv = Math.max(blue - (Math.floor((1-(bc/255))*(Math.abs(d)))),0)
}
rr=red
gg=green
bb=blue
imgdata.data[4*((a*w)+b)+0] = rv;
imgdata.data[4*((a*w)+b)+1] = gv;
imgdata.data[4*((a*w)+b)+2] = bv;
imgdata.data[4*((a*w)+b)+3] = alpha;
}
}
cont.putImageData(imgdata,0,0);
}
else
{
throw "Not A Farbfeld For "+name+" !"
}
}
function render_farbfeld_ff2less(ff,name,less)
{
var red;
var green;
var blue;
var alpha;
var rr=0
var gg=0
var bb=0
var rm=0
var gm=0
var bm=0
if (102 == ff[0].charCodeAt() && 97 == ff[1].charCodeAt() && 114 == ff[2].charCodeAt() && 98 == ff[3].charCodeAt() && 102 == ff[4].charCodeAt() && 101 == ff[5].charCodeAt() && 108 == ff[6].charCodeAt() && 100 == ff[7].charCodeAt())
{
var w = (ff[8].charCodeAt()*16777216)+(ff[9].charCodeAt()*65536)+(ff[10].charCodeAt()*256)+(ff[11].charCodeAt());
var h = (ff[12].charCodeAt()*16777216)+(ff[13].charCodeAt()*65536)+(ff[14].charCodeAt()*256)+(ff[15].charCodeAt());
var c = document.getElementById(name);
var cont = c.getContext('2d');
var imgdata = cont.createImageData(w,h);
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
var dr=Math.abs(red-rr)
var dg=Math.abs(green-gg)
var db=Math.abs(blue-bb)
var rv=red
var gv=green
var bv=blue
d=Math.max(dr,dg,db)
if ((d < Math.floor(less/256)) | (d > (255-Math.floor(less/256))))
{
rv = red
gv = green
bv = blue
rm = rv
gm = gv
bm = bv
}
else
{
rv = rm
gv = gm
bv = bm
}
imgdata.data[4*((a*w)+b)+0] = rv;
imgdata.data[4*((a*w)+b)+1] = gv;
imgdata.data[4*((a*w)+b)+2] = bv;
imgdata.data[4*((a*w)+b)+3] = alpha;
rr=red
gg=green
bb=blue
}
}
cont.putImageData(imgdata,0,0);
}
else
{
throw "Not A Farbfeld For "+name+" !"
}
}
function render_farbfeld_paperbackground(ff,ffbg,name)
{
if (!(102 == ffbg[0].charCodeAt() && 97 == ffbg[1].charCodeAt() && 114 == ffbg[2].charCodeAt() && 98 == ffbg[3].charCodeAt() && 102 == ffbg[4].charCodeAt() && 101 == ffbg[5].charCodeAt() && 108 == ffbg[6].charCodeAt() && 100 == ffbg[7].charCodeAt()))
{
throw "Not A Farbfeld Background For "+name+" !";
}
var x = (ffbg[8].charCodeAt()*16777216)+(ffbg[9].charCodeAt()*65536)+(ffbg[10].charCodeAt()*256)+(ffbg[11].charCodeAt());
var y = (ffbg[12].charCodeAt()*16777216)+(ffbg[13].charCodeAt()*65536)+(ffbg[14].charCodeAt()*256)+(ffbg[15].charCodeAt());
var e = x*y;
var red;
var green;
var blue;
var alpha;
var redbg;
var greenbg;
var bluebg;
var alphabg;
if (102 == ff[0].charCodeAt() && 97 == ff[1].charCodeAt() && 114 == ff[2].charCodeAt() && 98 == ff[3].charCodeAt() && 102 == ff[4].charCodeAt() && 101 == ff[5].charCodeAt() && 108 == ff[6].charCodeAt() && 100 == ff[7].charCodeAt())
{
var w = (ff[8].charCodeAt()*16777216)+(ff[9].charCodeAt()*65536)+(ff[10].charCodeAt()*256)+(ff[11].charCodeAt());
var h = (ff[12].charCodeAt()*16777216)+(ff[13].charCodeAt()*65536)+(ff[14].charCodeAt()*256)+(ff[15].charCodeAt());
var n = w*h;
if (n !== e)
{
throw "Not Same Size For "+name+" !";
}
var c = document.getElementById(name);
var cont = c.getContext('2d');
var imgdata = cont.createImageData(w,h);
for (var a=0;a<h;a++)
{
for (var b=0;b<w;b++)
{
red   = ff[16+0+(8*(b+(a*w)))].charCodeAt();
green = ff[16+2+(8*(b+(a*w)))].charCodeAt();
blue  = ff[16+4+(8*(b+(a*w)))].charCodeAt();
alpha = ff[16+6+(8*(b+(a*w)))].charCodeAt();
redbg   = ffbg[16+0+(8*(b+(a*w)))].charCodeAt();
greenbg = ffbg[16+2+(8*(b+(a*w)))].charCodeAt();
bluebg  = ffbg[16+4+(8*(b+(a*w)))].charCodeAt();
// Source From ::::::: https://www.rapidtables.com/convert/color/rgb-to-cmyk.html
k = 1-Math.max((red/255),(green/255),(blue/255))
if (k !== 1)
{
var c = (1-(red/255)-k)/(1-k)
var m = (1-(green/255)-k)/(1-k)
var y = (1-(blue/255)-k)/(1-k)
}
else
{
var c = 0
var m = 0
var y = 0
}
var z = Math.max(Math.floor(k*255),Math.floor(c*255),Math.floor(m*255),Math.floor(y*255))
red = Math.max(red-Math.floor((255-redbg)*((255-z)/255)),0)
green = Math.max(green-Math.floor((255-greenbg)*((255-z)/255)),0)
blue = Math.max(blue-Math.floor((255-bluebg)*((255-z)/255)),0)
imgdata.data[4*((a*w)+b)+0] = red;
imgdata.data[4*((a*w)+b)+1] = green;
imgdata.data[4*((a*w)+b)+2] = blue;
imgdata.data[4*((a*w)+b)+3] = alpha;
}
}
cont.putImageData(imgdata,0,0);
}
else
{
throw "Not A Farbfeld For "+name+" !"
}
}
