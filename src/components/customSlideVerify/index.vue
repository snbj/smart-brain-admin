<template>
    <div class="drag-verify-container" ref="containerRef" @mousedown="startDrag" @mouseup="stopDrag"
        @mousemove="handleMouseMove" @mouseleave="handleMouseLeaveComponent">
        <div class="progress-bar" :style="{ width: `${progress}%`, transition: getProgressBarTransition }">
        </div>
        <el-transition name="slide">
            <div class="drag-button" :style="{
                left: `${dragPosition}px`,
                filter: isDisabled ? 'grayscale(1)' : 'none',
                backgroundColor: 'hsl(216, 5%, 19%)',
                transition: getButtonTransition
            }">
                <svg v-if="isVerified === false" xmlns="http://www.w3.org/2000/svg" :style="{ color: 'white' }"
                    width="20" viewBox="0 0 2048 2048">
                    <path fill="currentColor"
                        d="m187 262l762 762l-762 762L6 1605l581-581L6 443zm1786 762l-762 762l-181-181l581-581l-581-581l181-181z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" :style="{ color: 'white' }" width="20"
                    viewBox="0 0 2048 2048">
                    <path fill="currentColor" d="M640 1755L19 1133l90-90l531 530L1939 275l90 90z" />
                </svg>
            </div>
        </el-transition>
        <div class="center-text" :class="{ 'color-animation': progress === 100 }">{{ centerText }}</div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';

const containerRef = ref<HTMLDivElement | null>(null);
const dragPosition = ref(0);
const isDragging = ref(false);
const isDisabled = ref(false);
const offsetX = ref(0);
const progress = ref(0);
const maxDragPosition = ref(0);
const centerText = ref('请按住滑块手动');
const isDragStopped = ref(false);
const isVerified = ref(false); // 新增标志位，标记验证是否成功



const getProgressBarTransition = computed(() => {
    if (isDragging.value) {
        return '';
    }
    // 缩短时间并使用 cubic-bezier 函数
    return 'width 0.2s cubic-bezier(0.8, 0, 0.2, 1), backgroundColor 0.1s ease';
});

const getButtonTransition = computed(() => {
    if (isDragging.value) {
        return '';
    }
    // 缩短时间并使用 cubic-bezier 函数
    return 'left 0.2s cubic-bezier(0.8, 0, 0.2, 1)';
});

const startDrag = (e: MouseEvent) => {
    if (isVerified.value) return
    isDragging.value = true;
    isDisabled.value = false;
    isDragStopped.value = false;
    offsetX.value = e.clientX - dragPosition.value;
    e.preventDefault();
    e.stopPropagation();
};

const stopDrag = () => {
    isDragging.value = false;
    isDragStopped.value = true;
    if (dragPosition.value < maxDragPosition.value) {
        setTimeout(() => {
            dragPosition.value = 0;
            progress.value = 0;
            isDisabled.value = true;
            centerText.value = '请按住滑块手动';
        }, 200); // 适当缩短延迟时间
    }
};

const handleMouseMove = (e: MouseEvent) => {
    if (isVerified.value) return

    if (isDragging.value) {
        const newX = e.clientX - offsetX.value;
        if (newX >= 0) {
            dragPosition.value = Math.min(newX, maxDragPosition.value);
            progress.value = (dragPosition.value / maxDragPosition.value) * 100;
            if (progress.value === 100) {
                centerText.value = '验证成功';
                isVerified.value = true
            } else {
                centerText.value = '请按住滑块手动';
            }
        }
    }
};

const handleMouseLeaveComponent = () => {
    if (isDragging.value) {
        isDragging.value = false;
        isDragStopped.value = true;
        if (dragPosition.value < maxDragPosition.value) {
            setTimeout(() => {
                dragPosition.value = 0;
                progress.value = 0;
                isDisabled.value = true;
                centerText.value = '请按住滑块拖动';
            }, 100); // 适当缩短延迟时间
        }
    }
};

onMounted(() => {
    if (containerRef.value) {
        const containerWidth = containerRef.value.offsetWidth;
        const buttonWidth = 50;
        maxDragPosition.value = containerWidth - buttonWidth;
    }
});
defineExpose({
    isVerified
})
</script>

<style scoped>
.drag-verify-container {
    position: relative;
    height: 40px;
    width: 100%;
    border: 1px solid #4c4d4f;
    background-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-radius: 8px;
}

.progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 8px;
    z-index: 1;
    background: hsl(144, 57%, 58%)
}

.drag-button {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 50px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    border-radius: 8px;
    z-index: 3;
}

.drag-button i {
    font-size: 20px;
}

.center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #666;
    z-index: 2;
    transition: color 0.5s ease;
}

.color-animation {
    color: white;
}

.slide-leave-active {
    /* 缩短时间并使用 cubic-bezier 函数 */
    transition: left 0.3s cubic-bezier(0.8, 0, 0.2, 1);
}

.slide-leave-to {
    left: 0;
}
</style>