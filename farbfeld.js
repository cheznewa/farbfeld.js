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
for (var a=0;a<h;a++)
{
for (var b=0;b<w;b++)
{
red   = String(ff[16+0+(8*(b+(a*w)))].charCodeAt());
green = String(ff[16+2+(8*(b+(a*w)))].charCodeAt());
blue  = String(ff[16+4+(8*(b+(a*w)))].charCodeAt());
alpha = String(ff[16+6+(8*(b+(a*w)))].charCodeAt());
document.write("<span style=\"font-size:1px;color:rgba("+red+","+green+","+blue+","+alpha+");\">█</span>");
}
document.write("<br/>");
}
}
else
{
document.write("Not A Farbfeld")
}
}