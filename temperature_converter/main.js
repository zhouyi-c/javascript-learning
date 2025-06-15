/**
 * 温度转换器 - 摄氏度转华氏度
 * 动态显示转换结果
 */

// 等待DOM完全加载后执行
document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const celsiusInput = document.getElementById('celsius');
    const fahrenheitDisplay = document.getElementById('fahrenheit');
    
    // 初始化设置
    celsiusInput.focus();
    
    // 事件监听器
    celsiusInput.addEventListener('input', handleTemperatureConversion);
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            resetConverter();
        }
    });
    
    // 添加输入验证
    celsiusInput.addEventListener('blur', validateInput);
});

/**
 * 温度转换处理函数
 */
function handleTemperatureConversion() {
    const celsiusValue = parseFloat(this.value);
    let resultText = '--';
    
    if (!isNaN(celsiusValue)) {
        const fahrenheitValue = celsiusToFahrenheit(celsiusValue);
        resultText = `${fahrenheitValue.toFixed(2)} ℉`;
        animateResult();
    } else if (this.value === '') {
        resultText = '--';
    } else {
        resultText = '请输入有效数字';
    }
    
    document.getElementById('fahrenheit').textContent = resultText;
}

/**
 * 摄氏度转华氏度计算
 * @param {number} celsius - 摄氏度值
 * @returns {number} 华氏度值
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

/**
 * 结果动画效果
 */
function animateResult() {
    const display = document.getElementById('fahrenheit');
    display.classList.add('result-pulse');
    setTimeout(() => {
        display.classList.remove('result-pulse');
    }, 300);
}

/**
 * 输入验证
 */
function validateInput() {
    if (this.value && isNaN(parseFloat(this.value))) {
        this.classList.add('input-error');
        setTimeout(() => {
            this.classList.remove('input-error');
        }, 2000);
    }
}

/**
 * 重置转换器
 */
function resetConverter() {
    const celsiusInput = document.getElementById('celsius');
    celsiusInput.value = '';
    document.getElementById('fahrenheit').textContent = '--';
    celsiusInput.focus();
}