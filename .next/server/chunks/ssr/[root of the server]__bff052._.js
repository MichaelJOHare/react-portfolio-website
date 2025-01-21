module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/app/projects/chess/types/index.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MoveType": (()=>MoveType),
    "PieceType": (()=>PieceType),
    "PlayerColor": (()=>PlayerColor),
    "PlayerType": (()=>PlayerType)
});
var PieceType = /*#__PURE__*/ function(PieceType) {
    PieceType["PAWN"] = "pawn";
    PieceType["ROOK"] = "rook";
    PieceType["KNIGHT"] = "knight";
    PieceType["BISHOP"] = "bishop";
    PieceType["QUEEN"] = "queen";
    PieceType["KING"] = "king";
    return PieceType;
}({});
var PlayerColor = /*#__PURE__*/ function(PlayerColor) {
    PlayerColor["WHITE"] = "white";
    PlayerColor["BLACK"] = "black";
    return PlayerColor;
}({});
var PlayerType = /*#__PURE__*/ function(PlayerType) {
    PlayerType["HUMAN"] = "Human";
    PlayerType["COMPUTER"] = "Computer";
    return PlayerType;
}({});
var MoveType = /*#__PURE__*/ function(MoveType) {
    MoveType["STNDRD"] = "Standard";
    MoveType["CASTLE"] = "Castling";
    MoveType["EP"] = "EnPassant";
    MoveType["PROMO"] = "Promotion";
    return MoveType;
}({});
}}),
"[project]/src/app/projects/chess/utils/square.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createSquare": (()=>createSquare)
});
const createSquare = (row, col, piece)=>({
        row,
        col,
        piece
    });
}}),
"[project]/src/app/projects/chess/utils/move.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createCastlingMove": (()=>createCastlingMove),
    "createEnPassantMove": (()=>createEnPassantMove),
    "createPromotionMove": (()=>createPromotionMove),
    "createStandardMove": (()=>createStandardMove)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/types/index.ts [app-ssr] (ecmascript)");
;
const createStandardMove = (piece, from, to, capturedPiece, isCapture)=>({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MoveType"].STNDRD,
        from,
        to,
        capturedPiece,
        piece,
        isCapture
    });
const createCastlingMove = (king, rook, kingFrom, kingTo, rookFrom, rookTo)=>({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MoveType"].CASTLE,
        from: kingFrom,
        to: kingTo,
        capturedPiece: undefined,
        piece: king,
        rook: rook,
        isCapture: false,
        kingFrom,
        kingTo,
        rookFrom,
        rookTo
    });
const createEnPassantMove = (piece, from, to, capturedPieceSquare, capturedPiece)=>({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MoveType"].EP,
        piece: piece,
        from: from,
        to: to,
        capturedPieceSquare: capturedPieceSquare,
        capturedPiece: capturedPiece
    });
const createPromotionMove = (piece, from, to, promotionType, capturedPiece)=>({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MoveType"].PROMO,
        piece: piece,
        from: from,
        to: to,
        promotionType: promotionType,
        capturedPiece: capturedPiece
    });
}}),
"[project]/src/app/projects/chess/utils/strategies/bishopMovementStrategy.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "bishopMovementStrategy": (()=>bishopMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-ssr] (ecmascript)");
;
const bishopMovementStrategy = (board, piece)=>{
    let legalMoves = [];
    let row = piece.currentSquare.row;
    let col = piece.currentSquare.col;
    const directions = [
        [
            1,
            1
        ],
        [
            1,
            -1
        ],
        [
            -1,
            -1
        ],
        [
            -1,
            1
        ]
    ];
    directions.forEach(([dRow, dCol])=>{
        let newRow = row + dRow;
        let newCol = col + dCol;
        while(newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7){
            const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol, piece);
            const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
            const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
            if (targetPiece && targetPiece.color === piece.color) {
                break;
            }
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare, capturedPiece));
            if (capturedPiece) {
                break;
            }
            newRow += dRow;
            newCol += dCol;
        }
    });
    return legalMoves;
};
}}),
"[project]/src/app/projects/chess/utils/strategies/kingMovementStrategy.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "kingMovementStrategy": (()=>kingMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-ssr] (ecmascript)");
;
const kingMovementStrategy = (board, piece, isBoardFlipped)=>{
    const legalMoves = [];
    let row = piece.currentSquare.row;
    let col = piece.currentSquare.col;
    const directions = [
        [
            1,
            0
        ],
        [
            0,
            1
        ],
        [
            -1,
            0
        ],
        [
            0,
            -1
        ],
        [
            1,
            1
        ],
        [
            1,
            -1
        ],
        [
            -1,
            1
        ],
        [
            -1,
            -1
        ]
    ];
    const addCastlingMoves = (board, king, legalMoves)=>{
        const rookPositions = isBoardFlipped ? {
            kingSideRookCol: 0,
            queenSideRookCol: 7
        } : {
            kingSideRookCol: 7,
            queenSideRookCol: 0
        };
        const kingSideRook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPieceAt"])(board, king.currentSquare.row, rookPositions.kingSideRookCol);
        const queenSideRook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPieceAt"])(board, king.currentSquare.row, rookPositions.queenSideRookCol);
        if (kingSideRook && !kingSideRook.hasMoved && !king.hasMoved) {
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCastlingMove"])(king, kingSideRook, king.currentSquare, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(king.currentSquare.row, king.currentSquare.col + 2, king), kingSideRook.currentSquare, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(kingSideRook.currentSquare.row, kingSideRook.currentSquare.col - 2, kingSideRook)));
        }
        if (queenSideRook && !queenSideRook.hasMoved && !king.hasMoved) {
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCastlingMove"])(king, queenSideRook, king.currentSquare, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(king.currentSquare.row, king.currentSquare.col - 2, king), queenSideRook.currentSquare, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(queenSideRook.currentSquare.row, queenSideRook.currentSquare.col + 3, queenSideRook)));
        }
    };
    directions.forEach(([dRow, dCol])=>{
        let newRow = row + dRow;
        let newCol = col + dCol;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol, piece);
            const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
            const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
            if (capturedPiece) {
                legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare, capturedPiece));
            } else if (!targetPiece) {
                legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare));
            }
        }
    });
    addCastlingMoves(board, piece, legalMoves);
    return legalMoves;
};
}}),
"[project]/src/app/projects/chess/utils/strategies/knightMovementStrategy.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "knightMovementStrategy": (()=>knightMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-ssr] (ecmascript)");
;
const knightMovementStrategy = (board, piece)=>{
    let legalMoves = [];
    let row = piece.currentSquare.row;
    let col = piece.currentSquare.col;
    const knightMoves = [
        [
            -2,
            1
        ],
        [
            -1,
            2
        ],
        [
            2,
            1
        ],
        [
            1,
            2
        ],
        [
            -2,
            -1
        ],
        [
            -1,
            -2
        ],
        [
            2,
            -1
        ],
        [
            1,
            -2
        ]
    ];
    knightMoves.forEach(([dRow, dCol])=>{
        let newRow = row + dRow;
        let newCol = col + dCol;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol, piece);
            const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
            const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
            if (capturedPiece) {
                legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare, capturedPiece));
            } else if (!targetPiece) {
                legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare));
            }
        }
    });
    return legalMoves;
};
}}),
"[project]/src/app/projects/chess/utils/strategies/pawnMovementStrategy.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "pawnMovementStrategy": (()=>pawnMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/types/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-ssr] (ecmascript)");
;
;
const pawnMovementStrategy = (board, piece, isBoardFlipped, moveHistory)=>{
    const legalMoves = [];
    const { row, col } = piece.currentSquare;
    const direction = (piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? -1 : 1) * (isBoardFlipped ? -1 : 1);
    const backRank = isBoardFlipped ? piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 7 : 0 : piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 0 : 7;
    const startingRow = isBoardFlipped ? piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 1 : 6 : piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 6 : 1;
    const rowBeforePromotionRow = isBoardFlipped ? piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 6 : 1 : piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 1 : 6;
    const addNormalMoves = (row, col, direction, backRank, piece, board, legalMoves)=>{
        const newRow = row + direction;
        if (newRow !== backRank && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmpty"])(board, newRow, col)) {
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(row, col), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(newRow, col, piece)));
        }
    };
    const addDoubleMove = (row, col, direction, startingRow, piece, board, legalMoves)=>{
        const newRow = row + 2 * direction;
        if (row === startingRow && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmpty"])(board, row + direction, col) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEmpty"])(board, newRow, col)) {
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(row, col), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(newRow, col, piece)));
        }
    };
    const addCaptureMoves = (row, col, direction, backRank, piece, board, legalMoves)=>{
        [
            -1,
            1
        ].forEach((colOffset)=>{
            const newRow = row + direction;
            const newCol = col + colOffset;
            if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
                const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol);
                const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
                const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
                if (capturedPiece && newRow === backRank) {
                    return;
                }
                capturedPiece && legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(row, col, piece), targetSquare, capturedPiece));
            }
        });
    };
    const addEnPassantMoves = (row, col, piece, board, moveHistory, legalMoves)=>{
        if (!moveHistory) {
            return;
        }
        const enPassantStartingRow = isBoardFlipped ? piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 6 : 1 : piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 1 : 6;
        const enPassantEndRow = isBoardFlipped ? piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 4 : 3 : piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 3 : 4;
        const lastMove = moveHistory[moveHistory.length - 1];
        if (lastMove && lastMove.piece.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].PAWN && lastMove.from.row === enPassantStartingRow && lastMove.to.row === enPassantEndRow && row === enPassantEndRow && Math.abs(col - lastMove.to.col) === 1) {
            const currentSquare = {
                row,
                col
            };
            const targetSquare = {
                row: row + direction,
                col: lastMove.to.col,
                piece
            };
            const capturedPiece = board[lastMove.to.row][lastMove.to.col].piece;
            if (capturedPiece) {
                const tempMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEnPassantMove"])(piece, currentSquare, targetSquare, capturedPiece.currentSquare, capturedPiece);
                legalMoves.push(tempMove);
            }
        }
    };
    const addPromotionMoves = (row, col, piece, board, legalMoves)=>{
        const forwardSquare = {
            row: row + direction,
            col
        };
        if (row === rowBeforePromotionRow) {
            if (!board[forwardSquare.row][forwardSquare.col].piece) {
                Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"]).forEach((promotionType)=>{
                    if (promotionType !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].PAWN && promotionType !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].KING) {
                        const promotionMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPromotionMove"])(piece, {
                            row,
                            col,
                            piece
                        }, forwardSquare, promotionType);
                        legalMoves.push(promotionMove);
                    }
                });
            }
            [
                -1,
                1
            ].forEach((colOffset)=>{
                const newCol = col + colOffset;
                let capturedPiece;
                if (newCol >= 0 && newCol < 8) {
                    capturedPiece = board[forwardSquare.row][newCol].piece;
                }
                if (capturedPiece && capturedPiece.color !== piece.color) {
                    Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"]).forEach((promotionType)=>{
                        if (promotionType !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].PAWN && promotionType !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].KING) {
                            const promotionMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPromotionMove"])(piece, {
                                row,
                                col
                            }, {
                                row: forwardSquare.row,
                                col: newCol,
                                piece
                            }, promotionType, capturedPiece);
                            legalMoves.push(promotionMove);
                        }
                    });
                }
            });
        }
    };
    addNormalMoves(row, col, direction, backRank, piece, board, legalMoves);
    addDoubleMove(row, col, direction, startingRow, piece, board, legalMoves);
    addCaptureMoves(row, col, direction, backRank, piece, board, legalMoves);
    addEnPassantMoves(row, col, piece, board, moveHistory, legalMoves);
    addPromotionMoves(row, col, piece, board, legalMoves);
    return legalMoves;
};
}}),
"[project]/src/app/projects/chess/utils/strategies/queenMovementStrategy.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "queenMovementStrategy": (()=>queenMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-ssr] (ecmascript)");
;
const queenMovementStrategy = (board, piece)=>{
    let legalMoves = [];
    let row = piece.currentSquare.row;
    let col = piece.currentSquare.col;
    const directions = [
        [
            1,
            0
        ],
        [
            0,
            1
        ],
        [
            -1,
            0
        ],
        [
            0,
            -1
        ],
        [
            1,
            1
        ],
        [
            1,
            -1
        ],
        [
            -1,
            1
        ],
        [
            -1,
            -1
        ]
    ];
    directions.forEach(([dRow, dCol])=>{
        let newRow = row + dRow;
        let newCol = col + dCol;
        while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
            const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol, piece);
            const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
            const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
            if (targetPiece && targetPiece.color === piece.color) {
                break;
            }
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare, capturedPiece));
            if (capturedPiece) {
                break;
            }
            newRow += dRow;
            newCol += dCol;
        }
    });
    return legalMoves;
};
}}),
"[project]/src/app/projects/chess/utils/strategies/rookMovementStrategy.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "rookMovementStrategy": (()=>rookMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-ssr] (ecmascript)");
;
const rookMovementStrategy = (board, piece)=>{
    let legalMoves = [];
    let row = piece.currentSquare.row;
    let col = piece.currentSquare.col;
    const directions = [
        [
            1,
            0
        ],
        [
            0,
            1
        ],
        [
            -1,
            0
        ],
        [
            0,
            -1
        ]
    ];
    directions.forEach(([dRow, dCol])=>{
        let newRow = row + dRow;
        let newCol = col + dCol;
        while(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
            const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol, piece);
            const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
            const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
            if (targetPiece && targetPiece.color === piece.color) {
                break;
            }
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare, capturedPiece));
            if (capturedPiece) {
                break;
            }
            newRow += dRow;
            newCol += dCol;
        }
    });
    return legalMoves;
};
}}),
"[project]/src/app/projects/chess/utils/strategies/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
;
;
;
;
}}),
"[project]/src/app/projects/chess/utils/strategies/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$bishopMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/bishopMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$kingMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/kingMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$knightMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/knightMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$pawnMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/pawnMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$queenMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/queenMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$rookMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/rookMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/index.ts [app-ssr] (ecmascript) <locals>");
}}),
"[project]/src/app/projects/chess/utils/board.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "defaultBoard": (()=>defaultBoard),
    "getPieceAt": (()=>getPieceAt),
    "isEmpty": (()=>isEmpty),
    "setupPieces": (()=>setupPieces)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/types/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$rookMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/rookMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$knightMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/knightMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$bishopMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/bishopMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$queenMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/queenMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$kingMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/kingMovementStrategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$pawnMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/pawnMovementStrategy.ts [app-ssr] (ecmascript)");
;
;
;
const defaultBoard = ()=>{
    return Array.from({
        length: 8
    }, (_, row)=>Array.from({
            length: 8
        }, (_, col)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSquare"])(row, col, undefined)));
};
const setupPieces = (isBoardFlipped)=>[
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].ROOK,
            positions: [
                {
                    row: 0,
                    col: 0
                },
                {
                    row: 0,
                    col: 7
                }
            ],
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$rookMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rookMovementStrategy"]
        },
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].KNIGHT,
            positions: [
                {
                    row: 0,
                    col: 1
                },
                {
                    row: 0,
                    col: 6
                }
            ],
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$knightMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["knightMovementStrategy"]
        },
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].BISHOP,
            positions: [
                {
                    row: 0,
                    col: 2
                },
                {
                    row: 0,
                    col: 5
                }
            ],
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$bishopMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bishopMovementStrategy"]
        },
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].QUEEN,
            positions: isBoardFlipped ? [
                {
                    row: 0,
                    col: 4
                }
            ] : [
                {
                    row: 0,
                    col: 3
                }
            ],
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$queenMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["queenMovementStrategy"]
        },
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].KING,
            positions: isBoardFlipped ? [
                {
                    row: 0,
                    col: 3
                }
            ] : [
                {
                    row: 0,
                    col: 4
                }
            ],
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$kingMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kingMovementStrategy"]
        },
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].PAWN,
            positions: Array.from({
                length: 8
            }, (_, col)=>({
                    row: 1,
                    col
                })),
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$pawnMovementStrategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pawnMovementStrategy"]
        }
    ];
const getPieceAt = (board, row, col)=>{
    return board[row][col].piece;
};
const isEmpty = (board, row, col)=>{
    return !board[row][col].piece;
};
}}),
"[project]/src/app/projects/chess/utils/player.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createPlayer": (()=>createPlayer)
});
const createPlayer = (color, type)=>({
        color,
        type
    });
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/src/app/projects/chess/utils/piece.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createPiece": (()=>createPiece)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm/v4.js [app-ssr] (ecmascript) <export default as v4>");
;
const createPiece = (player, type, color, currentSquare, movementStrategy, isAlive, hasMoved)=>({
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        player,
        type,
        color,
        currentSquare,
        movementStrategy,
        isAlive,
        hasMoved
    });
}}),
"[project]/src/app/projects/chess/utils/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
;
;
;
}}),
"[project]/src/app/projects/chess/utils/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$player$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/player.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$piece$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/piece.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-ssr] (ecmascript) <locals>");
}}),
"[project]/src/app/projects/chess/hooks/useChessGame.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useChessGame": (()=>useChessGame)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/types/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$player$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/player.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$piece$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/piece.ts [app-ssr] (ecmascript)");
;
;
;
const useChessGame = ()=>{
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        board: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultBoard"])(),
        players: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$player$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPlayer"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerType"].HUMAN),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$player$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPlayer"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].BLACK, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerType"].HUMAN)
        ],
        piecesByPlayer: new Map(),
        currentPlayerMoves: [],
        capturedPieces: [],
        isKingInCheck: false,
        kingSquare: undefined,
        currentPlayerIndex: 0,
        moveHistory: [],
        undoneMoves: [],
        halfMoveClock: 0,
        fullMoveNumber: 1
    });
    const player1 = gameState.players[0];
    const player2 = gameState.players[1];
    const initializeBoard = (isBoardFlipped)=>{
        const setup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setupPieces"])(isBoardFlipped);
        const newBoard = gameState.board;
        let newPiecesByPlayer = new Map();
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].BLACK
        ].forEach((color)=>{
            const isWhite = color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE;
            const rowOffset = isBoardFlipped ? isWhite ? 0 : 7 : isWhite ? 7 : 0;
            const pawnRow = isBoardFlipped ? isWhite ? 1 : 6 : isWhite ? 6 : 1;
            setup.forEach(({ type, positions, movementStrategy })=>{
                positions.forEach(({ row, col })=>{
                    const player = color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? player1 : player2;
                    const pieceRow = row + (type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].PAWN ? pawnRow - 1 : rowOffset);
                    const square = gameState.board[pieceRow][col];
                    const hasMoved = type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].ROOK || type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieceType"].KING ? false : undefined;
                    const piece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$piece$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPiece"])(player, type, color, square, movementStrategy, true, hasMoved);
                    newBoard[pieceRow][col].piece = piece;
                    const playerPieces = newPiecesByPlayer.get(player) || [];
                    newPiecesByPlayer.set(player, [
                        ...playerPieces,
                        piece
                    ]);
                });
            });
        });
        setGameState((prevState)=>({
                ...prevState,
                board: newBoard,
                piecesByPlayer: newPiecesByPlayer
            }));
    };
    return {
        ...gameState,
        initializeBoard
    };
};
}}),
"[project]/src/app/projects/chess/components/board/ChessPiece.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ChessPiece": (()=>ChessPiece)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
;
;
const ChessPiece = ({ piece, type, color, square })=>{
    const { attributes, listeners, setNodeRef, transform } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDraggable"])({
        id: `${type}-${square[0]}-${square[1]}`
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        className: "h-3/4 z-10 select-none",
        ref: setNodeRef,
        style: style,
        ...listeners,
        ...attributes,
        src: `/assets/images/${color}-${type}.svg`,
        alt: `${type}`
    }, void 0, false, {
        fileName: "[project]/src/app/projects/chess/components/board/ChessPiece.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
};
}}),
"[project]/src/app/projects/chess/components/board/ChessSquare.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ChessSquare": (()=>ChessSquare)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
;
;
const ChessSquare = ({ square, isBoardFlipped, children })=>{
    const { isOver, setNodeRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDroppable"])({
        id: `droppable-${square[0]}-${square[1]}`
    });
    const isDark = (square[0] + square[1]) % 2 === 0;
    const isLabeledColumn = square[1] === 7;
    const isLabeledRow = square[0] === 7;
    const columnLabel = isBoardFlipped ? 1 + square[0] : 8 - square[0];
    const rowLabel = isBoardFlipped ? String.fromCharCode(104 - square[1]) : String.fromCharCode(97 + square[1]);
    const getColor = (isDark)=>{
        return isOver ? "bg-green-500" : isDark ? "bg-orange-200" : "bg-yellow-900";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative flex justify-center items-center w-full h-full aspect-square ${getColor(isDark)}`,
        ref: setNodeRef,
        children: [
            children,
            isLabeledColumn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute top-0 right-0 pt-1 pr-1 text-xs lg:text-sm ${isDark ? "text-yellow-900" : "text-orange-200"} select-none`,
                children: columnLabel
            }, void 0, false, {
                fileName: "[project]/src/app/projects/chess/components/board/ChessSquare.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this),
            isLabeledRow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute bottom-0 left-0 pl-1 text-xs lg:text-sm ${isDark ? "text-yellow-900" : "text-orange-200"} select-none`,
                children: rowLabel
            }, void 0, false, {
                fileName: "[project]/src/app/projects/chess/components/board/ChessSquare.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/projects/chess/components/board/ChessSquare.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
};
}}),
"[project]/src/app/projects/chess/components/board/Board.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Board": (()=>Board)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$ChessPiece$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/components/board/ChessPiece.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$ChessSquare$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/components/board/ChessSquare.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
;
;
const Board = ({ board, isBoardFlipped })=>{
    const [parent, setParent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handlePieceSelection = (row, col)=>{};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DndContext"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            id: "chessboard",
            className: "relative grid grid-cols-8 w-[90vmin] h-[90vmin] lg:w-[70vmin] lg:h-[70vmin]",
            children: board.map((row, rowIndex)=>row.map((square, colIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$ChessSquare$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChessSquare"], {
                        square: [
                            rowIndex,
                            colIndex
                        ],
                        isBoardFlipped: isBoardFlipped,
                        onSquareClick: handlePieceSelection,
                        children: square.piece && square.piece.isAlive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$ChessPiece$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChessPiece"], {
                            type: square.piece.type,
                            color: square.piece.color,
                            piece: square.piece,
                            square: [
                                rowIndex,
                                colIndex
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/app/projects/chess/components/board/Board.tsx",
                            lineNumber: 32,
                            columnNumber: 17
                        }, this)
                    }, `${rowIndex}-${colIndex}`, false, {
                        fileName: "[project]/src/app/projects/chess/components/board/Board.tsx",
                        lineNumber: 25,
                        columnNumber: 13
                    }, this)))
        }, void 0, false, {
            fileName: "[project]/src/app/projects/chess/components/board/Board.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/projects/chess/components/board/Board.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
};
}}),
"[project]/src/app/projects/chess/components/ui/ChessGameContainer.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ChessGameContainer": (()=>ChessGameContainer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$hooks$2f$useChessGame$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/hooks/useChessGame.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$Board$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/components/board/Board.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const ChessGameContainer = ()=>{
    const gameManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$hooks$2f$useChessGame$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChessGame"])();
    const [isBoardFlipped, setisBoardFlipped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        gameManager.initializeBoard(isBoardFlipped);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col justify-center lg:flex-row",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$Board$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Board"], {
                board: gameManager.board,
                isBoardFlipped: isBoardFlipped
            }, void 0, false, {
                fileName: "[project]/src/app/projects/chess/components/ui/ChessGameContainer.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/projects/chess/components/ui/ChessGameContainer.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/projects/chess/components/ui/ChessGameContainer.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
};
}}),
"[project]/src/app/projects/chess/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__bff052._.js.map