import { EChartsOption } from 'echarts';
import { Post } from '../shared/models/post.model';

export function convertPostToChart(post: Post): EChartsOption {
  const sortedUpvotes = post.upvotesByDay.sort((a, b) => a.date.getTime() - b.date.getTime());

  const categories = sortedUpvotes.map((upvote) => upvote.date.toDateString());

  const data = sortedUpvotes.map((upvote) => upvote.amount);

  return {
    xAxis: {
      type: 'category',
      data: categories,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data,
        type: 'line',
        smooth: true,
      },
    ],
  };
}
