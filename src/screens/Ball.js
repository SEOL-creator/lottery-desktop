/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import "./Ball.css";

export default function Ball({ type, currentIndex, index, value }) {
    return (
        <div
            className={`ball`}
            css={[
                type === "게시글 뽑기"
                    ? css`
                          font-size: 30px;
                      `
                    : null,
                currentIndex === index
                    ? css`
                          display: flex;
                      `
                    : null,
            ]}
        >
            {value}
        </div>
    );
}
