
document.addEventListener('DOMContentLoaded', function() {
    // DOM 元素
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const completedCount = document.getElementById('completedCount');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // 当前过滤状态
    let currentFilter = 'all';
    
    // 任务数组
    let tasks = [];
    
    // 从本地存储加载任务
    loadTasks();
    
    // 事件监听器
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            renderTasks();
        });
    });
    
    // 添加新任务
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date()
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        
        taskInput.value = '';
        taskInput.focus();
    }
    
    // 渲染任务列表
    function renderTasks() {
        // 根据当前过滤状态筛选任务
        let filteredTasks = [];
        switch (currentFilter) {
            case 'active':
                filteredTasks = tasks.filter(task => !task.completed);
                break;
            case 'completed':
                filteredTasks = tasks.filter(task => task.completed);
                break;
            default:
                filteredTasks = [...tasks];
        }
        
        // 清空任务列表
        taskList.innerHTML = '';
        
        // 如果没有任务，显示空状态
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <i class="icon">✓</i>
                    <h3>暂无待办事项</h3>
                    <p>添加任务以开始你的计划</p>
                </div>
            `;
        } else {
            // 渲染每个任务
            filteredTasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskItem.dataset.id = task.id;
                
                taskItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text">${task.text}</span>
                    <button class="delete-btn">×</button>
                `;
                
                taskList.appendChild(taskItem);
            });
        }
        
        // 更新统计信息
        updateStats();
        
        // 添加任务项的事件监听器
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', toggleTaskStatus);
        });
        
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteTask);
        });
        
        document.querySelectorAll('.task-text').forEach(text => {
            text.addEventListener('dblclick', editTask);
        });
    }
    
    // 切换任务状态（完成/未完成）
    function toggleTaskStatus(e) {
        const taskId = parseInt(e.target.closest('.task-item').dataset.id);
        const task = tasks.find(task => task.id === taskId);
        
        if (task) {
            task.completed = e.target.checked;
            saveTasks();
            renderTasks();
        }
    }
    
    // 删除任务
    function deleteTask(e) {
        const taskId = parseInt(e.target.closest('.task-item').dataset.id);
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }
    
    // 编辑任务
    function editTask(e) {
        const taskItem = e.target.closest('.task-item');
        const taskId = parseInt(taskItem.dataset.id);
        const task = tasks.find(task => task.id === taskId);
        
        if (!task) return;
        
        const textElement = e.target;
        const originalText = task.text;
        
        // 创建输入框
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'edit-input';
        input.value = originalText;
        
        // 替换文本为输入框
        textElement.replaceWith(input);
        input.focus();
        
        // 保存编辑
        function saveEdit() {
            const newText = input.value.trim();
            
            if (newText && newText !== originalText) {
                task.text = newText;
                saveTasks();
            }
            
            renderTasks();
        }
        
        // 事件监听器
        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });
    }
    
    // 更新统计信息
    function updateStats() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        
        taskCount.textContent = `${totalTasks} 个任务`;
        completedCount.textContent = `已完成: ${completedTasks}`;
    }
    
    // 保存任务到本地存储
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // 从本地存储加载任务
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            renderTasks();
        }
    }
});