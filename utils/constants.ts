export type AnimationEffect =
    | 'CLICK_PLAY_AND_BACKWARDS' // 点击播放和后退 toggle click
    | 'HOVER_PLAY_AND_STOP' // 悬停播放和停止
    | 'HOVER_PLAY_AND_BACKWARDS' // 悬停播放和后退
    | 'CLICK_PLAY' // 点击播放
    | 'LOOP_PLAY' // 循环播放
    | 'CLICK_PLAY_AND_SEGMENTS'; // 点击播放和片段

export type Animation = {
    animationData: any;
    animationKey: string;
};
