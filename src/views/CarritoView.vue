<template>
  <v-container class="my-7 max-width-l">
    <div class="carrito">
      <div v-if="!allowAddress && !allowCard">
        <h2>Carrito de compras</h2>
        <div v-if="hasProducts">
          <ul class="my-8" v-for="(item, index) in local" :key="index">
            <li class="li-image">
              <img :src="item.image0url" :alt="item.titulo" />
            </li>
            <li class="li-title">{{ item.titulo }}</li>
            <li class="li-price">
              {{ (item.precio * item.cantidad) | arsCurrency }}
            </li>
            <li class="li-cantidad">
              <v-btn @click="decreaseItem(index)" class="success btn-with-actions"
                >-</v-btn
              >
              <input type="number" :value="item.cantidad" readonly />
              <v-btn
                @click="increaseItem(index)"
                :disabled="item.cantidad >= 5"
                class="success btn-with-actions"
              >
                +
              </v-btn>
            </li>
            <li>
              <v-icon @click="deleteItem(index)" class="delete"
                >mdi-delete</v-icon
              >
            </li>
          </ul>
        </div>
        <p v-else>No se han agregado items aún</p>
        <v-alert dense outlined type="error" v-if="alertIncrease">
          No se puede agregar más de 5 productos
        </v-alert>
        <hr />
        <span class="price-total"
          >Precio total {{ precioTotal | arsCurrency }}</span
        >
        <div class="buttons-container mt-4">
          <v-btn
            class="error btn-custom"
            x-large
            :disabled="!hasProducts"
            @click="deleteAll()"
          >
            Vaciar carrito
          </v-btn>
          <v-btn
            class="success btn-custom"
            x-large
            :disabled="!hasProducts"
            @click="show(1)"
          >
            Continuar
          </v-btn>
        </div>
      </div>
      <div v-if="allowAddress">
        <h2>Datos personales</h2>
        <form v-if="!hasAddress" class="my-3" @submit.prevent="saveAddressData">
          <div class="mb-3">
            <v-text-field
              label="Nombre"
              type="text"
              v-model.trim="userName"
              required
            />
          </div>
          <div class="mb-3">
            <v-text-field
              label="Correo"
              type="email"
              v-model="userEmail"
              required
            />
          </div>
          <div class="mb-3">
            <v-text-field
              label="Dirección"
              type="text"
              v-model.trim="userAddress"
              required
            />
          </div>
          <div class="mb-3">
            <v-text-field
              label="Fecha de entrega"
              type="date"
              :min="minDate"
              :max="maxDate"
              v-model="userDeliveryDate"
              required
            />
          </div>
          <v-btn class="primary my-3" type="submit"> Guardar </v-btn>
        </form>
        <div v-else class="address">
          <h3>Tiene guardado los siguientes datos</h3>
          <ul>
            <li v-for="(item, index) in addressData" :key="index">
              {{ item }}
            </li>
            <li>
              <v-icon @click="deleteAddressData()" class="delete"
                >mdi-delete</v-icon
              >
            </li>
          </ul>
        </div>
        <div class="buttons-container">
          <v-btn class="warning btn-custom" x-large @click="show(0)">
            Volver
          </v-btn>
          <v-btn
            class="success btn-custom"
            x-large
            :disabled="!hasAddress"
            @click="show(2)"
          >
            Continuar
          </v-btn>
        </div>
      </div>
      <div v-if="allowCard">
        <h2>Información de pago</h2>
        <form v-if="!hasCard" class="my-3" @submit.prevent="saveCardData">
          <div class="mb-8">
            <v-text-field
              label="Número de tarjeta"
              type="text"
              maxlength="19"
              v-model.trim="numberCard"
              @input="numberCardSolve"
              required
            />
          </div>
          <div class="mb-8">
            <v-text-field
              label="Nombre del titular"
              type="text"
              v-model.trim="nameCard"
              required
            />
          </div>
          <div class="mb-8 double-row">
            <div>
              <v-select
                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                label="Mes de vencimiento"
                dense
                v-model="dateMonth"
                required
              >
              </v-select>
            </div>
            <div>
              <v-text-field
                label="Año de vencimiento"
                type="number"
                min="2023"
                max="2050"
                v-model="dateYear"
                required
              />
            </div>
          </div>
          <div class="mb-8 double-row">
            <div>
              <v-text-field
                label="Código de seguridad"
                type="number"
                max="999"
                @input="numberCardSolve"
                v-model="securityCode"
                required
              />
            </div>
            <div>
              <v-text-field
                label="DNI"
                type="number"
                min="0"
                max="100000000"
                v-model.number="dni"
                required
              />
            </div>
          </div>
          <v-btn class="primary my-3" type="submit"> Guardar </v-btn>
        </form>
        <div v-else class="card-data">
          <h3>Tiene guardado los siguientes datos</h3>
          <ul>
            <li v-for="(item, index) in cardData" :key="index">{{ item }}</li>
            <li>
              <v-icon @click="deleteCardData()" class="delete">mdi-delete</v-icon>
            </li>
          </ul>
        </div>
        <hr />
        <span class="price-total"
          >Precio total {{ precioTotal | arsCurrency }}</span
        >
        <div class="buttons-container mt-3">
          <v-btn class="warning btn-custom" x-large @click="show(1)">
            Volver
          </v-btn>
          <v-btn
            class="primary btn-custom"
            x-large
            :disabled="!hasCard"
            @click="endPurchase()"
          >
            Confirmar compra
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scope lang="scss">
  .carrito {
    padding: 2rem;
    background: white;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 999;
    border-radius: 0.25rem;

    @media screen and (max-width: 780px) {
      padding: 1rem;
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      @media screen and (max-width: 780px) {
        justify-content: flex-start;
      }

      @media screen and (max-width: 680px) {
        overflow-x: scroll;
      }

      .btn-with-actions {
        width: 30px !important;
        height: 30px !important;
        min-width: 30px !important;
        border-radius: 0 !important;
      }

      .delete {
        font-size: 2rem !important;
        color: #f44336 !important;

        &:hover {
          cursor: pointer;
          color: #dc3545;
        }
      }

      input {
        width: 3rem;
        height: 30px;
        appearance: textfield;
        text-align: center;
        border: 1px solid rgb(207, 207, 207);
      }

      .li-image {
        display: flex;
        justify-content: center;

        @media screen and (max-width: 680px) {
          width: auto;
        }

        img {
          width: 126px;
        }
      }

      .li-title {
        width: 300px;
        min-width: 200px;
        text-align: center;
      }

      .li-price {
        width: 120px;
        min-width: 120px;
        text-align: center;
        color: #1a156b;
        font-weight: bold;
        font-size: 1.25rem;
      }

      .li-cantidad {
        width: 165px;
        display: flex;
        justify-content: center;
      }
    }

    .price-total {
      font-size: 1.5rem;
      color: #1a156b;
    }

    p {
      font-size: 1.25rem;
      margin: 1rem 0;
    }

    form {
      .v-input__icon {
        justify-content: flex-end;
      }

      .v-text-field__details {
        display: none;
      }

      .v-input__slot {
        margin: 0;
      }

      .v-select {
        padding-top: 12px;
        margin-top: 4px;
      }

      & + .buttons-container {
        border-top: 1px solid rgb(200, 200, 200);
        padding-top: 1rem;
      }
    }

    .buttons-container {
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 420px) {
        flex-direction: column;
        gap: 1.5rem;
      }

      .btn-custom {
        font-size: 1.25rem !important;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;

        a {
          padding: 2rem;
        }
      }
    }

  .address,
  .card-data {
    margin: 1.5rem 0;
    h3 {
      font-size: 1.25rem;
    }

    ul {
      margin: 1rem 0;
    }
  }

  .double-row {
    display: flex;
    gap: 2rem;
    div {
      width: 100%;
    }
  }

  hr {
    margin: 2rem 0 1rem 0;
  }
}
</style>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'CarritoView',
  components: {},
  filters: {
    arsCurrency: function (value) {
      return value.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
      })
    }
  },
  computed: {
    hasProducts () {
      return this.local?.length
    },
    hasAddress () {
      return this.addressData?.length
    },
    hasCard () {
      return this.cardData?.length
    },
    precioTotal () {
      const data = this.refreshLocal()
      let total = 0
      data?.forEach((item) => {
        total += item.precio * item.cantidad
      })
      return total
    },
    minDate () {
      const fecha = new Date()
      return new Date(fecha.setDate(fecha.getDate() + 1))
        .toISOString()
        .split('T')[0]
    },
    maxDate () {
      const fecha = new Date()
      return new Date(fecha.setMonth(fecha.getMonth() + 2))
        .toISOString()
        .split('T')[0]
    }
  },
  data: () => ({
    local: JSON.parse(localStorage.getItem('carrito')) || [],
    addressData: JSON.parse(localStorage.getItem('datos')) || null,
    cardData: JSON.parse(localStorage.getItem('tarjeta')) || null,
    alertIncrease: false,
    allowAddress: false,
    allowCard: false,
    userName: '',
    userEmail: '',
    userAddress: '',
    userDeliveryDate: '',
    numberCard: '',
    nameCard: '',
    dateMonth: '',
    dateYear: '',
    securityCode: '',
    dni: ''
  }),
  methods: {
    decreaseItem (index) {
      const item = this.local.splice(index, 1)[0]
      if (item.cantidad > 1) {
        item.cantidad--
        this.local.push(item)
        localStorage.setItem('carrito', JSON.stringify(this.local))
      } else {
        Swal.fire({
          title: '¿Estas seguro que queres eliminarlo?',
          text: 'No podras deshacer esta acción',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.local.splice(index, 1)
            localStorage.setItem('carrito', JSON.stringify(this.local))
            Swal.fire(
              'Eliminado',
              'El producto se ha eliminado del carrito',
              'success'
            )
          } else {
            Swal.fire(
              'No se ha eliminado',
              'El producto seguirá en el carrito.',
              'warning'
            )
          }
        })
      }
      this.refreshLocal()
    },
    increaseItem (index) {
      const item = this.local.splice(index, 1)[0]
      if (item.cantidad < 5) {
        item.cantidad++
        this.local.push(item)
        localStorage.setItem('carrito', JSON.stringify(this.local))
      } else {
        this.alertIncrease = true
      }
      this.refreshLocal()
      setTimeout(() => {
        this.alertIncrease = false
      }, 3000)
    },
    deleteItem (index) {
      Swal.fire({
        title: '¿Estas seguro que queres eliminarlo?',
        text: 'No podras deshacer esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.local.splice(index, 1)
          localStorage.setItem('carrito', JSON.stringify(this.local))
          Swal.fire(
            'Eliminado',
            'El producto se ha eliminado del carrito',
            'success'
          )
        } else {
          Swal.fire(
            'No se ha eliminado',
            'El producto seguirá en el carrito',
            'warning'
          )
        }
        this.refreshLocal()
      })
    },
    deleteAll () {
      Swal.fire({
        title: '¿Estas seguro que queres vaciarlo?',
        text: 'No podras deshacer esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('carrito', JSON.stringify([]))
          Swal.fire(
            'Se ha vaciado',
            'El carrito se ha quedado sin productos',
            'success'
          )
        } else {
          Swal.fire(
            'No se ha vaciado',
            'El carrito seguirá con los productos que estan agregados',
            'warning'
          )
        }
        this.refreshLocal()
      })
    },
    saveAddressData () {
      if (
        !this.userName ||
        !this.userEmail ||
        !this.userAddress ||
        !this.userDeliveryDate
      ) {
        Swal.fire(
          'No puede haber campos vacíos',
          'Todos los campos del formulario son obligatorios',
          'error'
        )
      } else {
        const min = new Date().toISOString().split('T')[0]
        const max = new Date(new Date().setMonth(new Date().getMonth() + 2))
          .toISOString()
          .split('T')[0]
        if (this.userDeliveryDate <= min || this.userDeliveryDate > max) {
          Swal.fire(
            'La fecha no es correcta',
            'La fecha debe ser al menos un día mayor a la actual y como máximo dos meses más a la fecha actual',
            'error'
          )
          return
        }

        localStorage.setItem(
          'datos',
          JSON.stringify([
            this.userName,
            this.userEmail,
            this.userAddress,
            this.userDeliveryDate
          ])
        )
        Swal.fire('Se han guardado los datos correctamente', '', 'success')
      }
      this.addressData = JSON.parse(localStorage.getItem('datos')) || null
    },
    deleteAddressData () {
      Swal.fire({
        title: '¿Estas seguro que queres eliminar tus datos?',
        text: 'No podras deshacer esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('datos')
          Swal.fire('Se han eliminado tus datos de dirección', '', 'success')
        } else {
          Swal.fire('No se han eliminado tus datos', '', 'warning')
        }
        this.addressData = JSON.parse(localStorage.getItem('datos')) || null
      })
    },
    saveCardData () {
      if (
        !this.numberCard ||
        !this.nameCard ||
        !this.dateMonth ||
        !this.dateYear ||
        !this.securityCode ||
        !this.dni
      ) {
        Swal.fire(
          'No puede haber campos vacíos',
          'Todos los campos del formulario son obligatorios',
          'error'
        )
      } else {
        if (this.numberCard.length !== 19) {
          Swal.fire(
            'El número de la tarjeta no es correcto',
            'Debe estar constituido por 16 dígitos',
            'error'
          )
          return
        }

        if (this.securityCode.length !== 3 || isNaN(this.securityCode)) {
          Swal.fire(
            'El código de seguridad no es correcto',
            'Debe tener 3 números',
            'error'
          )
          return
        }

        if (
          new Date(Date.now())
            .toISOString()
            .split('T')[0]
            .split('-', 2)
            .join('-') >= `${this.dateYear}-0${this.dateMonth + 1}`
        ) {
          Swal.fire(
            'La fecha de vencimiento no es correcta',
            'Debe ser igual o mayor al mes y año en el que nos encontramos',
            'error'
          )
          return
        }

        if (isNaN(this.dni)) {
          Swal.fire(
            'El DNI no es correcto',
            'El DNI debe contener únicamente números',
            'error'
          )
          return
        }

        localStorage.setItem(
          'tarjeta',
          JSON.stringify([
            this.numberCard,
            this.nameCard,
            `${this.dateMonth}/${this.dateYear}`,
            this.securityCode,
            this.dni
          ])
        )
        Swal.fire('Se han guardado los datos correctamente', '', 'success')
      }
      this.cardData = JSON.parse(localStorage.getItem('tarjeta')) || null
    },
    deleteCardData () {
      Swal.fire({
        title: '¿Estas seguro que queres eliminar los datos de tu tajerta?',
        text: 'No podras deshacer esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('tarjeta')
          Swal.fire('Se han eliminado los datos de tu tarjeta', '', 'success')
        } else {
          Swal.fire(
            'No se han eliminado los datos de tu tarjeta',
            '',
            'warning'
          )
        }
        this.cardData = JSON.parse(localStorage.getItem('tarjeta')) || null
      })
    },
    endPurchase () {
      localStorage.removeItem('carrito')
      this.refreshLocal()
      this.show(0)
      this.$emit('toggle-cart')
      this.$emit('open-nav-list')
      let timerInterval
      Swal.fire({
        title: 'La compra se realizó con éxito',
        html: '<p>¡Felicidades por tu compra!<br /> <em class="d-block mt-3">Esta alerta se cerrara automáticamente.</em></p>',
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
      this.$router.push('/productos')
    },
    show (index) {
      switch (index) {
        case 0:
          this.allowAddress = false
          this.allowCard = false
          break
        case 1:
          this.allowAddress = true
          this.allowCard = false
          break
        case 2:
          this.allowAddress = false
          this.allowCard = true
          break
      }
    },
    refreshLocal () {
      this.local = JSON.parse(localStorage.getItem('carrito'))
      this.local?.sort((a, b) => a.id - b.id)
      return this.local
    },
    numberCardSolve () {
      switch (this.numberCard?.length) {
        case 4:
          this.numberCard += '-'
          break
        case 9:
          this.numberCard += '-'
          break
        case 14:
          this.numberCard += '-'
          break
      }
    }
  }
}
</script>
