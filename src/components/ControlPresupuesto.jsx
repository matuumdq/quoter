import {useEffect, useState} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

      const [porcentaje, setPorcentaje] = useState(0)
      const [disponible, setDisponible] = useState(0)
      const [gastado, setGastado] = useState(0)

      useEffect(() => {
            const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)

            const totalDisponible = presupuesto-totalGastado
            
            const nuevoPorcentaje = ((totalGastado*100)/presupuesto ).toFixed(2)
            
            
            setGastado(totalGastado)
            setDisponible(totalDisponible)

            setTimeout(() => {
                  setPorcentaje(nuevoPorcentaje)
            }, 700);
       }, [gastos])

      
      

      const formatearCantidad = (cantidad) => {
            return cantidad.toLocaleString ('en-US', {
                  style:  'currency',
                  currency: 'USD'
            })
      }

      const resetearApp = () => {
           const resultado = confirm('Desea reiniciar presupuesto y gastos?')

           if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
           } 
      }

  return (
    <div className='contenedor-presupuesto sombra contenedor dos-columnas'>
      <div>
            <CircularProgressbar
                  styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                  })}
                  value={porcentaje}
                  text={`${porcentaje}% Gastado`}
            />
      </div>
      <div className='contenido-presupuesto'>
            <button     className='reset-app'
                        type='button'
                        onClick={()=> resetearApp()}> 
                        Resetear App 
            </button>
            <p>
                  <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : null}`}>
                  <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                  <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto