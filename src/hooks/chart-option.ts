import { computed } from 'vue';
import { EChartsOption } from 'echarts';
import { useAppStore } from '@/store';

// for code hints
// import { SeriesOption } from 'echarts';
// Because there are so many configuration items, this provides a relatively convenient code hint.
// When using vue, pay attention to the reactive issues. It is necessary to ensure that corresponding functions can be triggered, TypeScript does not report errors, and code writing is convenient.
export default function useChartOption(
  sourceOption: () => {
    yAxis: {
      axisLabel: { formatter(value: any, idx: number): any | string };
      axisLine: { show: boolean };
      splitLine: { lineStyle: { color: string; type: string }; show: boolean };
      type: string;
    };
    xAxis: {
      axisLabel: { textStyle: { color: string } };
      offset: number;
      data: Array<UnwrapRefSimple<string>>;
      axisLine: { show: boolean };
      axisTick: { show: boolean };
      splitLine: {
        lineStyle: { color: string };
        show: boolean;
        interval: (idx: number) => boolean;
      };
      axisPointer: {
        lineStyle: { color: string; width: number };
        show: boolean;
      };
      type: string;
      boundaryGap: boolean;
    };
    grid: { top: string; left: string; bottom: string; right: string };
    series: {
      areaStyle: { color: LinearGradient; opacity: number };
      data: Array<UnwrapRefSimple<number>>;
      lineStyle: { color: LinearGradient; width: number };
      showSymbol: boolean;
      symbolSize: number;
      emphasis: { focus: string; itemStyle: { borderWidth: number } };
      type: string;
      smooth: boolean;
    }[];
    tooltip: { formatter(params): string; className: string; trigger: string };
    graphic: {
      elements: Array<
        UnwrapRefSimple<{
          [p: string]: unknown;
          bottom: string;
          style: {
            textAlign: string;
            fontSize: number;
            text: string;
            fill: string;
          };
          type: string;
        }>
      >;
    };
  }
) {
  const appStore = useAppStore();
  const isDark = computed(() => {
    return appStore.theme === 'dark';
  });
  // echarts support https://echarts.apache.org/zh/theme-builder.html
  // It's not used here
  // TODO echarts themes
  const chartOption = computed<EChartsOption>(() => {
    return sourceOption(isDark.value);
  });
  return {
    chartOption,
  };
}
