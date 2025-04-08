document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('sectors-chart').getContext('2d');
    
    // 图表数据
    const data = {
        labels: [
            '碱性电解槽 (AEL)',
            'PEM电解槽',
            '固体氧化物电解槽 (SOEC)',
            '碱性燃料电池',
            'PEM燃料电池',
            '固体氧化物燃料电池',
            '氢气储存',
            '氢能基础设施'
        ],
        datasets: [
            {
                label: '市场规模 (€B)',
                data: [3.1, 2.7, 0.9, 0.5, 1.8, 0.8, 1.4, 2.2],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            },
            {
                label: '增长率 (%)',
                data: [28, 35, 45, 20, 25, 30, 22, 18],
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1
            },
            {
                label: '部件相关性 (1-10)',
                data: [9, 7, 8, 9, 6, 7, 5, 4],
                backgroundColor: 'rgba(245, 158, 11, 0.5)',
                borderColor: 'rgba(245, 158, 11, 1)',
                borderWidth: 1
            }
        ]
    };
    
    // 图表选项
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.datasetIndex === 0) {
                            label += '€' + context.raw + 'B';
                        } else if (context.datasetIndex === 1) {
                            label += context.raw + '%';
                        } else {
                            label += context.raw + '/10';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 11
                    }
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 11
                    }
                }
            }
        }
    };
    
    // 创建图表
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
});
