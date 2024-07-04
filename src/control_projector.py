import sys
import aiohttp
import asyncio
from epson_projector import Projector

async def main():
    command = sys.argv[1]
    host = sys.argv[2]

    async with aiohttp.ClientSession() as session:
        projector = Projector(host, session)
        if command == 'TURN_ON':
            await projector.send_command('PWR ON')
            print('ON')
        elif command == 'TURN_OFF':
            await projector.send_command('PWR OFF')
            print('OFF')
        elif command == 'GET_POWER':
            state = await projector.get_property('PWR')
            print('ON' if state == '01' else 'OFF')
        elif command == 'VOL_UP':
            await projector.send_command('VOL_UP')
            print('VOLUME_UP')
        elif command == 'VOL_DOWN':
            await projector.send_command('VOL_DOWN')
            print('VOLUME_DOWN')
        elif command.startswith('SET_SOURCE_'):
            source = command.split('SET_SOURCE_')[1]
            await projector.send_command(source)
            print(f'SET_SOURCE_{source}')

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
