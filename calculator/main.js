// 获取DOM元素
const previousOperandEl = document.querySelector('[data-previous-operand]');
const currentOperandEl = document.querySelector('[data-current-operand]');
const buttons = document.querySelector('.buttons');

// 状态初始化
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false; // 新增：显示重置标志

// 1. 数字输入处理（
function appendNumber(number) {
    // 重置条件：显示区需重置 或 当前为初始0状态
    if (shouldResetScreen || currentOperand === '0') {
        currentOperand = '';
        shouldResetScreen = false;
    }
    
    // 小数点处理（防止重复输入）
    if (number === '.' && currentOperand.includes('.')) return;
    
    currentOperand += number;
    updateDisplay();
}

// 2. 运算符处理（支持连续计算）
function chooseOperation(op) {
    // 若已有待计算表达式，先执行计算
    if (previousOperand !== '' && !shouldResetScreen) {
        compute();
    }
    
    operation = op;
    previousOperand = currentOperand;
    shouldResetScreen = true; // 准备接收新操作数
    updateDisplay(); // 新增：立即更新显示
}

// 3. 计算功能（修复结果后状态）
function compute() {
    if (operation === undefined) return;
    
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let result;
    
    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷':
            if (current === 0) {
                alert('除数不能为零');
                clearAll();
                return;
            }
            result = prev / current; 
            break;
        case '%': result = prev % current; break;
        default: return;
    }
    
    currentOperand = result.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true; // ✅ 核心修复：计算后激活重置标志
    updateDisplay();
}

// 4. 清除功能
function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

// 5. 删除最后一位
function deleteLast() {
    currentOperand = currentOperand.slice(0, -1) || '0'; // 空值时显示0
    updateDisplay();
}

// 6. 更新显示（优化大数显示）
function updateDisplay() {
    // 当前操作数格式化（添加千位分隔符）
    const formattedCurrent = formatNumber(currentOperand);
    currentOperandEl.textContent = formattedCurrent;
    
    // 历史表达式显示（操作数+运算符）
    if (operation) {
        previousOperandEl.textContent = `${formatNumber(previousOperand)} ${operation}`;
    } else {
        previousOperandEl.textContent = '';
    }
}

// 7. 数字格式化（千位分隔符）
function formatNumber(numStr) {
    const num = parseFloat(numStr);
    if (isNaN(num)) return '0';
    
    // 处理小数部分
    const [integerPart, decimalPart] = numStr.split('.');
    let formatted = parseFloat(integerPart).toLocaleString('en');
    
    return decimalPart ? `${formatted}.${decimalPart}` : formatted;
}

// 事件委托处理按钮点击
buttons.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.matches('button')) return;
    
    // 数字按钮
    if (target.matches('[data-number]')) {
        appendNumber(target.textContent);
        return;
    }
    
    // 运算符按钮
    if (target.matches('[data-operation]')) {
        chooseOperation(target.textContent);
        return;
    }
    
    // 等号按钮
    if (target.matches('[data-equals]')) {
        compute();
        return;
    }
    
    // 清除按钮
    if (target.matches('[data-all-clear]')) {
        clearAll();
        return;
    }
    
    // 删除按钮
    if (target.matches('[data-delete]')) {
        deleteLast();
        return;
    }
});

// 8. 键盘支持（增强交互）
document.addEventListener('keydown', (e) => {
    if (/[0-9]/.test(e.key)) appendNumber(e.key);
    if (e.key === '.') appendNumber(e.key);
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearAll();
    if (e.key === '=' || e.key === 'Enter') compute();
    if (['+', '-', '*', '/', '%'].includes(e.key)) {
        chooseOperation(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
    }
});