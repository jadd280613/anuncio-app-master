<template>
    <div class="container2">
        <div class="row">
            <div class="col-3">
                <div class="row separador">
                    <div class="col-12 izq"><h1>Buscador</h1></div>
                    <div class="col-12 izq">Oficio</div>
                    <div class="col-12">
                        <select class="browser-default custom-select">
                            <option value="1">Carpintaero</option>
                            <option value="2">Plomero</option>
                            <option value="3">Electricista</option>
                        </select>
                    </div>
                    <div class="col-12 izq">Estado</div>
                    <div class="col-12">
                        <select class="browser-default custom-select">
                            <option value="1">Aguascalientes</option>
                            <option value="2">Campeche</option>
                            <option value="3">Zacatecas</option>
                        </select>
                    </div>

                    <div class="col-12 izq">Municipio</div>
                    <div class="col-12">
                        <select class="browser-default custom-select">
                            <option value="1">Calvillo</option>
                            <option value="2">mun 1</option>
                            <option value="3">mun 2</option>
                            <option value="4">mun 3</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="der">Parte Derecha</div>
            </div>
        </div>
    </div>
</template>



<style scoped>
td {
    padding-right: 10px;
}
.izq {
    padding-top: 10px;
    text-align: left;
}
.der {
    height: 500px;
    background-color: rgb(0, 255, 221);
}
.separador {
    padding-left: 10px;
    background-color: #ff0000;
}
</style>