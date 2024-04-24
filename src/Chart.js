import React from 'react';
import Plot from 'react-plotly.js';

const Chart = ({
                   time,
                   carrierSignal,
                   informationSignal,
                   modulatedSignal,
                   carrierSpectrum,
                   informationSpectrum,
                   modulatedSpectrum
               }) => {
    const chartContainerStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    };

    const chartRowStyle = {
        display: 'contents',
    };

    return (
        <div style={chartContainerStyle}>
            <div style={chartRowStyle}>
                <Plot
                    data={[
                        {
                            x: time,
                            y: carrierSignal,
                            type: 'scatter',
                            mode: 'lines',
                            line: {
                                color: 'rgb(165,196,177)',
                            },
                        }
                    ]}
                    layout={{
                        dragmode: 'zoom',
                        scrollZoom: true,
                        title: 'Несущий сигнал',
                        xaxis: {title: 'Время (с)'},
                        yaxis: {title: 'Амплитуда'},
                    }}
                />
                <Plot
                    data={[
                        {
                            x: carrierSpectrum.map((x) => x.x),
                            y: carrierSpectrum.map((x) => x.y),
                            type: 'scatter',
                            mode: 'lines',
                            line: {
                                color: 'rgb(165,196,177)',
                            },
                        }
                    ]}
                    layout={{
                        title: 'Спектр несущего сигнала',
                        xaxis: {title: 'Частота (Гц)'},
                        yaxis: {title: 'Амплитуда'}
                    }}
                />
            </div>
            <div style={chartRowStyle}>
                <Plot
                    data={[
                        {
                            x: time,
                            y: informationSignal,
                            type: 'scatter',
                            mode: 'lines',
                            line: {
                                color: 'rgb(239,218,109)',
                            },
                        }
                    ]}
                    layout={{title: 'Информационный сигнал', xaxis: {title: 'Время (с)'}, yaxis: {title: 'Амплитуда'}}}
                />
                <Plot
                    data={[
                        {
                            x: informationSpectrum.map((x) => x.x),
                            y: informationSpectrum.map((x) => x.y),
                            type: 'scatter',
                            mode: 'lines',
                            line: {
                                color: 'rgb(239,218,109)',
                            },
                        }
                    ]}
                    layout={{
                        title: 'Спектр информационного сигнала',
                        xaxis: {title: 'Частота (Гц)'},
                        yaxis: {title: 'Амплитуда'}
                    }}
                />
            </div>
            <div style={chartRowStyle}>
                <Plot
                    data={[
                        {
                            x: time,
                            y: modulatedSignal,
                            type: 'scatter',
                            mode: 'lines',
                            line: {
                                color: 'rgb(182,74,71)',
                            },
                        }
                    ]}
                    layout={{title: 'Результат модуляции', xaxis: {title: 'Время (с)'}, yaxis: {title: 'Амплитуда'}}}
                />
                <Plot
                    data={[
                        {
                            x: modulatedSpectrum.map((x) => x.x),
                            y: modulatedSpectrum.map((x) => x.y),
                            type: 'scatter',
                            mode: 'lines',
                            line: {
                                color: 'rgb(182,74,71)',
                            },
                        }
                    ]}
                    layout={{
                        title: 'Спектр результата модуляции',
                        xaxis: {title: 'Частота (Гц)'},
                        yaxis: {title: 'Амплитуда'}
                    }}
                />
            </div>
        </div>
    );
};

export default Chart;
