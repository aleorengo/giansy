type Position = { x: number; y: number; r: number; width: number };

// Closely spaced, staggered positions keep the centre filled. The whole
// arrangement is recentered and fitted to the oval as the selection changes.
const positions = [
  [0, 0],
  [-1, 0],
  [1, 0],
  [-0.5, -0.74],
  [0.5, -0.74],
  [-0.5, 0.74],
  [0.5, 0.74],
  [-1.5, -0.74],
  [1.5, -0.74],
  [-1.5, 0.74],
  [1.5, 0.74],
];

export function getTrayLayout(count: number): Position[] {
  if (count < 1) return [];
  let points = positions.slice(0, count);
  if (count === 4)
    points = [
      [0, 0.3],
      [-1, 0.3],
      [1, 0.3],
      [0, -0.6],
    ];
  if (count === 6) points[5] = [0, 0.74];
  // Keep custom future products visible, too, without imposing a display cap.
  for (let i = points.length; i < count; i++) {
    const angle = i * 2.399963;
    const radius = Math.sqrt(i / 3);
    points.push([Math.cos(angle) * radius, Math.sin(angle) * radius * 0.65]);
  }
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const left = Math.min(...xs),
    right = Math.max(...xs);
  const top = Math.min(...ys),
    bottom = Math.max(...ys);
  const spacing = Math.min(
    29,
    76 / (right - left + 1.12),
    44 / (bottom - top + 1.12),
  );
  return points.map(([x, y], i) => ({
    x:
      50 +
      (x - (left + right) / 2) * spacing +
      (i ? Math.sin(i * 2.07) * spacing * 0.06 : 0),
    y:
      49 +
      (y - (top + bottom) / 2) * spacing * 1.5 +
      (i ? Math.cos(i * 1.74) * spacing * 0.075 : 0),
    r: Math.sin(i * 2.4 + 0.4) * 13,
    width: spacing * 1.12 * (1 + Math.sin(i * 1.83) * 0.035),
  }));
}
