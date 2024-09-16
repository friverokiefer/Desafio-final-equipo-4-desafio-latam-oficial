import requests
import json

# URL base del API
BASE_URL = 'http://localhost:5000/api/instruments/'

# Lista de IDs de los instrumentos que quieres actualizar
instrument_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

# Nuevo valor de stock
new_stock = 150

# Función para actualizar el stock de un instrumento
def update_instrument_stock(instrument_id, new_stock):
    url = f'{BASE_URL}{instrument_id}'
    payload = {'stock': new_stock}

    try:
        # Hacer la solicitud PATCH
        response = requests.patch(url, json=payload)

        # Verificar si la solicitud fue exitosa
        if response.status_code == 200:
            # Convertir la respuesta en JSON y mostrar el resultado
            updated_instrument = response.json()
            print(f"Instrumento actualizado correctamente:\n{json.dumps(updated_instrument, indent=4)}")
        else:
            print(f"Error al actualizar el instrumento {instrument_id}. Código de estado: {response.status_code}")
            print(f"Detalles: {response.text}")

    except requests.exceptions.RequestException as e:
        print(f"Ocurrió un error de conexión al actualizar el instrumento {instrument_id}: {e}")

# Función principal para actualizar todos los instrumentos
def update_all_instruments_stock(instrument_ids, new_stock):
    print(f"Actualizando el stock de todos los instrumentos a {new_stock} unidades...\n")
    for instrument_id in instrument_ids:
        print(f"Actualizando el instrumento con ID {instrument_id}...")
        update_instrument_stock(instrument_id, new_stock)
        print("-" * 50)  # Separador para mejor legibilidad entre actualizaciones

# Llamada a la función principal para ejecutar las actualizaciones
if __name__ == "__main__":
    update_all_instruments_stock(instrument_ids, new_stock)
