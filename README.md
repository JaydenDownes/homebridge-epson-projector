<a name="top"></a>

<h1 align="center">
Epson Projector Homebridge Plugin 
</h1>

<br/>

> [!IMPORTANT]
> This software is currently under active development and may contain bugs or other issues. It is provided without warranty of any kind. By using this software, you acknowledge and accept that your use is at your own risk, and the developers are not liable for any damages or consequences arising from its use.

Welcome to the Homebridge Epson Projector Plugin! This plugin allows you to control your Epson projector through Homebridge, integrating it into your HomeKit setup as a TV accessory. You can control the power, volume, and input source of your projector using this plugin.

## Features

- Turn the projector on and off
- Adjust the volume
- Change the input source

## Installation

Follow these steps to install and configure the Homebridge Epson Projector Plugin.

### Prerequisites

1. **Homebridge**: Ensure you have Homebridge installed. If not, you can follow the [Homebridge installation guide](https://github.com/homebridge/homebridge/wiki).

2. **Python 3**: Ensure Python 3 is installed on your system. You can download it from [python.org](https://www.python.org/downloads/).

3. **Python Libraries**: The plugin requires `aiohttp` and `async_timeout` libraries. Install them using pip:
    ```bash
    pip install aiohttp async_timeout
    ```

### Plugin Installation

1. **Clone the Repository**: Clone this repository to your local machine.
    ```bash
    git clone https://github.com/your-username/homebridge-epson-projector.git
    ```

2. **Navigate to the Directory**: Navigate to the cloned directory.
    ```bash
    cd homebridge-epson-projector
    ```

3. **Install the Plugin**: Install the plugin using npm.
    ```bash
    npm install -g .
    ```

## Configuration

To configure the plugin, you need to add it to your Homebridge `config.json` file.

### Example Configuration

\```json
{
  "bridge": {
    "name": "Homebridge",
    "username": "CC:22:3D:E3:CE:30",
    "port": 51826,
    "pin": "031-45-154"
  },
  "platforms": [
    {
      "platform": "EpsonProjectorPlatform",
      "name": "Epson Projector Platform",
      "projectors": [
        {
          "name": "Living Room Projector",
          "host": "192.168.1.100"
        }
      ]
    }
  ]
}
\```

- `platform`: The name of the platform plugin.
- `name`: A friendly name for the platform.
- `projectors`: An array of projectors you want to control.
  - `name`: The name of the projector.
  - `host`: The IP address of the projector.

## How the Plugin Works

### File Structure

- `index.js`: The entry point of the plugin.
- `EpsonProjectorAccessory.js`: Contains the main logic for controlling the projector.
- `control_projector.py`: A Python script that sends commands to the projector.
- `package.json`: Contains metadata about the plugin.
- `README.md`: This readme file.

### Main Components

1. **EpsonProjectorAccessory.js**:
   - Creates a TV accessory for HomeKit.
   - Handles commands for turning the projector on and off, adjusting the volume, and changing the input source.
   - Uses `PythonShell` to execute the Python script with the appropriate command.

2. **control_projector.py**:
   - Connects to the Epson projector and sends commands.
   - Uses `aiohttp` for asynchronous HTTP requests.
   - Supports commands for power, volume, and input source control.

### Usage

After installing and configuring the plugin, restart Homebridge. Your Epson projector should appear as a TV accessory in the Home app on your iOS device. You can now control the projector using HomeKit.

### Controlling the Projector

- **Power**: Turn the projector on or off.
- **Volume**: Increase or decrease the volume.
- **Source**: Change the input source (e.g., HDMI1, HDMI2, PC).

## Troubleshooting

### Common Issues

1. **Homebridge Not Starting**: Ensure you have correctly formatted your `config.json`. You can use a JSON validator to check for errors.
2. **Projector Not Responding**: Ensure the IP address of the projector is correct and that the projector is connected to the network.

### Logs

Check the Homebridge logs for error messages. The logs will provide insights into what might be going wrong.

### Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/your-username/homebridge-epson-projector).

## Contributing

Contributions are welcome! If you want to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test your changes thoroughly.
5. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using the Homebridge Epson Projector Plugin! If you have any feedback or suggestions, feel free to reach out.
