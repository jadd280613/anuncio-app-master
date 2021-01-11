<template>
<div id="pie">
<section class="footer center-align" id="footer">
<span class="arrow-2"></span>
  <div class="container">
    <div class="row">
      <!-- start col #1 -->
      <div class="col s12">
        <ul>
             <li><a href="https://facebook.com" target="_blank"><i class="fa fa-facebook fa-2x"></i></a></li>
             <li><a href="https://twitter.com" target="_blank"><i class="fa fa-twitter fa-2x"></i></a></li>
             <li><a href="https://instagram.com" target="_blank"><i class="fa fa-instagram fa-2x"></i></a></li>
             <li><a href="https://youtube.com" target="_blank"><i class="fa fa-youtube fa-2x"></i></a></li>
        </ul>
        <h6 class="h-style">© 2020 <a href="https://ingenieriadesoftwareciencias.mx/" target="_blank">Ingenieria de Software Ciencias</a> | Todos los Reservados. </h6>
      </div>
    </div>
  </div>
</section>
</div>
</template>

<style>
@import url(https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css);

@import url(https://fonts.googleapis.com/css?family=Titillium+Web:300);
.fa-2x {
font-size: 2em;
}
.fa {
position: relative;
display: table-cell;
width: 60px;
height: 36px;
text-align: center;
vertical-align: middle;
font-size:20px;
}


#pie {
    position: absolute;
    bottom: auto;
    width: 100%;
    height: 25px;
    background-color: #26262b;
    color:#ffffff;
}
.footer {
    background: #1a1a1a;
    padding-top: 30px;
    padding-bottom: 60px
}

.footer ul {
    display: inline-flex;
    list-style-type: none;
}

.footer ul li {
    font-size: 30px;
    margin-right: 10px;
    transition: .3s
}


.footer h6 {
    color: #aaa
}

.footer h6>a {
    color: #ffbb06
}

.footer a {
  color: #ffbb06;
}

.footer a:hover {
  color: #ffffff;
}
</style>
