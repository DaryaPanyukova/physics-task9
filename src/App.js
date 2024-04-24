import React, { useState } from 'react';
import Chart from './Chart';

function App() {
    const [carrierFrequency, setCarrierFrequency] = useState(100);
    const [informationFrequency, setInformationFrequency] = useState(10);
    const [modulationIndex, setModulationIndex] = useState(0.5);

    const [status, setStatus] = useState('');

    const getStatus = () => {
        if (carrierFrequency <= 0 || informationFrequency <= 0 || modulationIndex < 0) {
            return 'Введенные значения некорректны';
        }
        if (modulationIndex > 1) {
            return 'При данном коэффициенте модуляции происходит перемодуляция';
        }
        return 'Введенные значения корректны';
    };

    const [carrierSignal, setCarrierSignal] = useState([]);
    const [informationSignal, setInformationSignal] = useState([]);
    const [modulatedSignal, setModulatedSignal] = useState([]);

    const [carrierSpectrum, setCarrierSpectrum] = useState([]);
    const [informationSpectrum, setInformationSpectrum] = useState([]);
    const [modulatedSpectrum, setModulatedSpectrum] = useState([]);

    const [time, setTime] = useState([]);

    const generateSignals = () => {
        const sampleRate = 1000;
        setTime(Array.from({ length: sampleRate }, (_, i) => i / sampleRate));

        const carrier = time.map((t) => Math.sin(2 * Math.PI * carrierFrequency * t));
        setCarrierSignal(carrier);

        const information = time.map((t) => Math.sin(2 * Math.PI * informationFrequency * t));
        setInformationSignal(information);

        const modulated = time.map(
            (t) => (1 + modulationIndex * Math.sin(2 * Math.PI * informationFrequency * t)) * Math.sin(2 * Math.PI * carrierFrequency * t)
        );
        setModulatedSignal(modulated);
    };

    const generateSpectra = () => {
        const fft = (signal) => {
            const n = signal.length;
            const fftOut = new Array(n);
            for (let k = 0; k < n; k++) {
                let real = 0;
                let imag = 0;
                for (let t = 0; t < n; t++) {
                    real += signal[t] * Math.cos(-2 * Math.PI * k * t / n);
                    imag += signal[t] * Math.sin(-2 * Math.PI * k * t / n);
                }
                fftOut[k] = Math.sqrt(real * real + imag * imag);
            }
            return fftOut;
        };

        const sampleRate = 1000;
        const n = carrierSignal.length;
        const carrierFft = fft(carrierSignal);
        const carrierSpectrumData = [];
        for (let k = 0; k < Math.floor(n / 2); k++) {
            carrierSpectrumData.push({ x: k * sampleRate / n, y: carrierFft[k] });
        }
        setCarrierSpectrum(carrierSpectrumData);

        const informationFft = fft(informationSignal);
        const informationSpectrumData = [];
        for (let k = 0; k < Math.floor(n / 2); k++) {
            informationSpectrumData.push({ x: k * sampleRate / n, y: informationFft[k] });
        }
        setInformationSpectrum(informationSpectrumData);

        const modulatedFft = fft(modulatedSignal);
        const modulatedSpectrumData = [];
        for (let k = 0; k < Math.floor(n / 2); k++) {
            modulatedSpectrumData.push({ x: k * sampleRate / n, y: modulatedFft[k] });
        }
        setModulatedSpectrum(modulatedSpectrumData);
    };


    React.useEffect(() => {
        generateSignals();
        generateSpectra();
    }, [generateSignals, generateSpectra, carrierFrequency, informationFrequency, modulationIndex]);

    React.useEffect(() => {
        setStatus(getStatus());
    }, [carrierFrequency, informationFrequency, modulationIndex]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Моделирование амплитудной модуляции сигнала</h1>
            <form style={{ display: 'inline-block', textAlign: 'left' }}>
                <label style={{ textAlign: 'left', paddingRight: '10px' }}>Частота несущего колебания (Гц):</label>
                <input type="number" value={carrierFrequency} onChange={(e) => setCarrierFrequency(e.target.value)} />
                <br />
                <label style={{ textAlign: 'left', paddingRight: '10px' }}>Частота информационного сигнала (Гц):</label>
                <input type="number" value={informationFrequency} onChange={(e) => setInformationFrequency(e.target.value)} />
                <br />
                <label style={{ textAlign: 'left', paddingRight: '10px' }}>Коэффициент модуляции:</label>
                <input type="number" value={modulationIndex} onChange={(e) => setModulationIndex(e.target.value)} />
            </form>
            <Chart
                time={time}
                carrierSignal={carrierSignal}
                informationSignal={informationSignal}
                modulatedSignal={modulatedSignal}
                carrierSpectrum={carrierSpectrum}
                informationSpectrum={informationSpectrum}
                modulatedSpectrum={modulatedSpectrum}
            />
        </div>
    );
}

export default App;
