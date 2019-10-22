// TypeScript file

declare namespace eui {
    /**
     * The TileLayout class arranges layout elements in columns and rows
     * of equally-sized cells.
     * The TileLayout class uses a number of properties that control orientation,
     * count, size, gap and justification of the columns and the rows
     * as well as element alignment within the cells.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/TileLayoutExample.ts
     * @language en_US
     */
    /**
     * TileLayout 类在单元格大小相等的列和行中排列布局元素。
     * TileLayout 类使用许多属性来控制列和行的方向、计数、大小、间隙和两端对齐以及单元格内的元素对齐。
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/TileLayoutExample.ts
     * @language zh_CN
     */
    class AnimTileLayout extends LayoutBase {
        /**
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 构造函数。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        constructor();
        /**
         * @private
         * 标记horizontalGap被显式指定过
         */
        private explicitHorizontalGap;
        /**
         * @private
         */
        private _horizontalGap;
        /**
         * Horizontal space between columns, in pixels.
         *
         * @default 6
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 列之间的水平空间（以像素为单位）。
         *
         * @default 6
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        horizontalGap: number;
        /**
         * @private
         * 标记verticalGap被显式指定过
         */
        private explicitVerticalGap;
        /**
         * @private
         */
        private _verticalGap;
        /**
         * Vertical space between rows, in pixels.
         *
         * @default 6
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 行之间的垂直空间（以像素为单位）。
         *
         * @default 6
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        verticalGap: number;
        /**
         * @private
         */
        private _columnCount;
        /**
         * Contain the actual column count.
         *
         * @default -1
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         *  实际列计数。
         *
         * @default -1
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        readonly columnCount: number;
        /**
         * @private
         */
        private _requestedColumnCount;
        /**
         * Number of columns to be displayed.
         * <p>Set to 0 to allow the TileLayout to determine
         * the column count automatically.</p>
         * <p>If the <code>orientation</code> property is set to <code>TileOrientation.ROWS</code>,
         * then setting this property has no effect
         * In this case, the <code>rowCount</code> is explicitly set, and the
         * container width is explicitly set. </p>
         *
         * @default 0
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 要显示的列数。
         * <p>设置为 0 会允许 TileLayout 自动确定列计数。</p>
         * <p>如果将 <code>orientation</code> 属性设置为 <code>TileOrientation.ROWS</code>，
         * 则设置此属性不会产生任何效果。这种情况下，会显式设置 code>rowCount</code>，并显式设置容器宽度。</p>
         *
         * @default 0
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        requestedColumnCount: number;
        /**
         * @private
         */
        private _rowCount;
        /**
         * The row count.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         *  行计数。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        readonly rowCount: number;
        /**
         * @private
         */
        private _requestedRowCount;
        /**
         * Number of rows to be displayed.
         * <p>Set to 0 to remove explicit override and allow the TileLayout to determine
         * the row count automatically.</p>
         * <p>If the <code>orientation</code> property is set to
         * <code>TileOrientation.COLUMNS</code>, setting this property has no effect.
         * in this case, <code>columnCount</code> is explicitly set, and the
         * container height is explicitly set.</p>
         *
         * @default 0
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 要显示的行数。
         * <code>设置为 -1 会删除显式覆盖并允许 TileLayout 自动确定行计数。</code>
         * <code>如果将 <code>orientation</code> 属性设置为 <code>TileOrientation.COLUMNS</code>，
         * 则设置此属性不会产生任何效果。这种情况下，会显式设置 <code>columnCount</code>，并显式设置容器高度。</code>
         *
         * @default 0
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        requestedRowCount: number;
        /**
         * @private
         * 外部显式指定的列宽
         */
        private explicitColumnWidth;
        /**
         * @private
         */
        private _columnWidth;
        /**
         * Contain the actual column width, in pixels.
         * <p>If not explicitly set, the column width is
         * determined from the width of the widest element. </p>
         *
         * @default NaN
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 包含实际列宽（以像素为单位）。
         * <p>若未显式设置，则从根据最宽的元素的宽度确定列宽度。</p>
         *
         * @default NaN
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        columnWidth: number;
        /**
         * @private
         * 外部显式指定的行高
         */
        private explicitRowHeight;
        /**
         * @private
         */
        private _rowHeight;
        /**
         * The row height, in pixels.
         * <p>If not explicitly set, the row height is
         * determined from the maximum of elements' height.</p>
         *
         * @default NaN
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 行高（以像素为单位）。
         * <p>如果未显式设置，则从元素的高度的最大值确定行高度。<p>
         *
         * @default NaN
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        rowHeight: number;
        /**
         * @private
         */
        private _paddingLeft;
        /**
         * @copy eui.LinearLayoutBase#paddingLeft
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        paddingLeft: number;
        /**
         * @private
         */
        private _paddingRight;
        /**
         * @copy eui.LinearLayoutBase#paddingRight
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        paddingRight: number;
        /**
         * @private
         */
        private _paddingTop;
        /**
         * @copy eui.LinearLayoutBase#paddingTop
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        paddingTop: number;
        /**
         * @private
         */
        private _paddingBottom;
        /**
         * @copy eui.LinearLayoutBase#paddingBottom
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        paddingBottom: number;
        /**
         * @private
         */
        private _horizontalAlign;
        /**
         * Specifies how to align the elements within the cells in the horizontal direction.
         * Supported values are
         * HorizontalAlign.LEFT、HorizontalAlign.CENTER、
         * HorizontalAlign.RIGHT、JustifyAlign.JUSTIFY。
         *
         * @default <code>JustifyAlign.JUSTIFY</code>
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 指定如何在水平方向上对齐单元格内的元素。支持的值有
         * HorizontalAlign.LEFT、HorizontalAlign.CENTER、
         * HorizontalAlign.RIGHT、JustifyAlign.JUSTIFY。
         *
         * @default <code>JustifyAlign.JUSTIFY</code>
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        horizontalAlign: string;
        /**
         * @private
         */
        private _verticalAlign;
        /**
         * 指定如何在垂直方向上对齐单元格内的元素。
         * 支持的值有 VerticalAlign.TOP、VerticalAlign.MIDDLE、
         * VerticalAlign.BOTTOM、JustifyAlign.JUSTIFY。
         * 默认值：JustifyAlign.JUSTIFY。
         *
         * @default <code>eui.JustifyAlign.JUSTIFY</code>
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * Specifies how to align the elements within the cells in the vertical direction.
         * Supported values are
         * VerticalAlign.TOP、VerticalAlign.MIDDLE、
         * VerticalAlign.BOTTOM、JustifyAlign.JUSTIFY。
         *
         * @default <code>eui.JustifyAlign.JUSTIFY</code>
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        verticalAlign: string;
        /**
         * @private
         */
        private _columnAlign;
        /**
         * Specifies how to justify the fully visible columns to the container width.
         *
         * <p>When set to <code>ColumnAlign.LEFT</code> it turns column justification off.
         *  There may be partially visible columns or whitespace between the last column and
         *  the right edge of the container.  This is the default value.</p>
         *
         * <p>When set to <code>ColumnAlign.JUSTIFY_USING_GAP</code> the <code>horizontalGap</code>
         * actual value increases so that
         * the last fully visible column right edge aligns with the container's right edge.
         * In case there is only a single fully visible column, the <code>horizontalGap</code> actual value
         * increases so that it pushes any partially visible column beyond the right edge
         * of the container.
         * Note that explicitly setting the <code>horizontalGap</code> property does not turn off
         * justification. It only determines the initial gap value.
         * Justification may increases it.</p>
         *
         * <p>When set to <code>ColumnAlign.JUSTIFY_USING_WIDTH</code> the <code>columnWidth</code>
         * actual value increases so that
         * the last fully visible column right edge aligns with the container's right edge.
         * Note that explicitly setting the <code>columnWidth</code> property does not turn off justification.
         * It only determines the initial column width value.
         * Justification may increases it.</p>
         *
         * @default ColumnAlign.LEFT
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 指定如何将完全可见列与容器宽度对齐。
         *
         * <p>设置为 <code>ColumnAlign.LEFT</code> 时，它会关闭列两端对齐。
         * 在容器的最后一列和右边缘之间可能存在部分可见的列或空白。这是默认值。</p>
         *
         * <p>设置为 <code>ColumnAlign.JUSTIFY_USING_GAP</code> 时，<code>horizontalGap</code> 的实际值将增大，
         * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。仅存在一个完全可见列时，
         * <code>horizontalGap</code> 的实际值将增大，这样它会将任何部分可见列推到容器的右边缘之外。
         * 请注意显式设置 <code>horizontalGap</code> 属性不会关闭两端对齐。它仅确定初始间隙值。两端对齐可能会增大它。</p>
         *
         * <p>设置为 <code>ColumnAlign.JUSTIFY_USING_WIDTH</code> 时，<code>columnWidth</code> 的实际值将增大，
         * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。请注意显式设置 <code>columnWidth</code> 属性不会关闭两端对齐。
         * 它仅确定初始列宽度值。两端对齐可能会增大它。</p>
         *
         * @default ColumnAlign.LEFT
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        columnAlign: string;
        /**
         * @private
         */
        private _rowAlign;
        /**
         * Specifies how to justify the fully visible rows to the container height.
         *
         * <p>When set to <code>RowAlign.TOP</code> it turns column justification off.
         * There might be partially visible rows or whitespace between the last row and
         * the bottom edge of the container.  This is the default value.</p>
         *
         * <p>When set to <code>RowAlign.JUSTIFY_USING_GAP</code> the <code>verticalGap</code>
         * actual value increases so that
         * the last fully visible row bottom edge aligns with the container's bottom edge.
         * In case there is only a single fully visible row, the value of <code>verticalGap</code>
         * increases so that it pushes any partially visible row beyond the bottom edge
         * of the container.  Note that explicitly setting the <code>verticalGap</code> does not turn off
         * justification, but just determines the initial gap value.
         * Justification can then increases it.</p>
         *
         * <p>When set to <code>RowAlign.JUSTIFY_USING_HEIGHT</code> the <code>rowHeight</code>
         * actual value increases so that
         * the last fully visible row bottom edge aligns with the container's bottom edge.  Note that
         * explicitly setting the <code>rowHeight</code> does not turn off justification, but
         * determines the initial row height value.
         * Justification can then increase it.</p>
         *
         * @default RowAlign.TOP
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 指定如何将完全可见行与容器高度对齐。
         *
         * <p>设置为 <code>RowAlign.TOP</code> 时，它会关闭列两端对齐。
         * 在容器的最后一行和底边缘之间可能存在部分可见的行或空白。这是默认值。</p>
         *
         * <p>设置为 <code>RowAlign.JUSTIFY_USING_GAP</code> 时，<code>verticalGap</code> 的实际值会增大，
         * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。仅存在一个完全可见行时，<code>verticalGap</code> 的值会增大，
         * 这样它会将任何部分可见行推到容器的底边缘之外。请注意，显式设置 <code>verticalGap</code>
         * 不会关闭两端对齐，而只是确定初始间隙值。两端对齐接着可以增大它。</p>
         *
         * <p>设置为 <code>RowAlign.JUSTIFY_USING_HEIGHT</code> 时，<code>rowHeight</code> 的实际值会增大，
         * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。请注意，显式设置 <code>rowHeight</code>
         * 不会关闭两端对齐，而只是确定初始行高度值。两端对齐接着可以增大它。</p>
         *
         * @default RowAlign.TOP
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        rowAlign: string;
        /**
         * @private
         */
        private _orientation;
        /**
         * Specifies whether elements are arranged row by row or
         * column by column.
         *
         * @default TileOrientation.ROWS
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 指定是逐行还是逐列排列元素。
         *
         * @default TileOrientation.ROWS
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        orientation: string;
        /**
         * @private
         * 标记目标容器的尺寸和显示列表失效
         */
        private invalidateTargetLayout();
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        measure(): void;
        /**
         * @private
         * 计算行和列的尺寸及数量
         */
        private calculateRowAndColumn(explicitWidth, explicitHeight);
        /**
         * @private
         * 缓存的最大子对象宽度
         */
        private maxElementWidth;
        /**
         * @private
         * 缓存的最大子对象高度
         */
        private maxElementHeight;
        /**
         * @private
         * 更新最大子对象尺寸
         */
        private updateMaxElementSize();
        /**
         * @private
         * 更新虚拟布局的最大子对象尺寸
         */
        private doUpdateMaxElementSize(startIndex, endIndex);
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        clearVirtualLayoutCache(): void;
        /**
         * @private
         * 当前视图中的第一个元素索引
         */
        private startIndex;
        /**
         * @private
         * 当前视图中的最后一个元素的索引
         */
        private endIndex;
        /**
         * @private
         * 视图的第一个和最后一个元素的索引值已经计算好的标志
         */
        private indexInViewCalculated;
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        scrollPositionChanged(): void;
        /**
         * @private
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        private getIndexInView();
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        updateDisplayList(width: number, height: number): void;
        /**
         * @private
         * 为单个元素布局
         */
        private sizeAndPositionElement(element, cellX, cellY, cellWidth, cellHeight);
        /**
         * @private
         * 为两端对齐调整间隔或格子尺寸
         */
        private adjustForJustify(width, height);
    }
}
