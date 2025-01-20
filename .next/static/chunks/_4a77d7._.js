(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_4a77d7._.js", {

"[project]/src/app/projects/chess/types/index.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/square.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createSquare": (()=>createSquare)
});
const createSquare = (row, col, piece)=>({
        row,
        col,
        piece
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/move.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createCastlingMove": (()=>createCastlingMove),
    "createEnPassantMove": (()=>createEnPassantMove),
    "createPromotionMove": (()=>createPromotionMove),
    "createStandardMove": (()=>createStandardMove)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/types/index.ts [app-client] (ecmascript)");
;
const createStandardMove = (piece, from, to, capturedPiece, isCapture)=>({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoveType"].STNDRD,
        from,
        to,
        capturedPiece,
        piece,
        isCapture
    });
const createCastlingMove = (king, rook, kingFrom, kingTo, rookFrom, rookTo)=>({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoveType"].CASTLE,
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
        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoveType"].EP,
        piece: piece,
        from: from,
        to: to,
        capturedPieceSquare: capturedPieceSquare,
        capturedPiece: capturedPiece
    });
const createPromotionMove = (piece, from, to, promotionType, capturedPiece)=>({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoveType"].PROMO,
        piece: piece,
        from: from,
        to: to,
        promotionType: promotionType,
        capturedPiece: capturedPiece
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/strategies/bishopMovementStrategy.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "bishopMovementStrategy": (()=>bishopMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-client] (ecmascript)");
;
const bishopMovementStrategy = (board, isBoardFlipped, piece)=>{
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
            const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol, piece);
            const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
            const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
            if (targetPiece && targetPiece.color === piece.color) {
                break;
            }
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare, capturedPiece));
            if (capturedPiece) {
                break;
            }
            newRow += dRow;
            newCol += dCol;
        }
    });
    return legalMoves;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/strategies/kingMovementStrategy.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "kingMovementStrategy": (()=>kingMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-client] (ecmascript)");
;
const kingMovementStrategy = (board, isBoardFlipped, piece)=>{
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
        const rookPositions = {
            kingSideRookCol: 7,
            queenSideRookCol: 0
        };
        const kingSideRook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPieceAt"])(board, king.currentSquare.row, rookPositions.kingSideRookCol);
        const queenSideRook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPieceAt"])(board, king.currentSquare.row, rookPositions.queenSideRookCol);
        if (kingSideRook && !kingSideRook.hasMoved && !king.hasMoved) {
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCastlingMove"])(king, kingSideRook, king.currentSquare, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(king.currentSquare.row, king.currentSquare.col + 2, king), kingSideRook.currentSquare, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(kingSideRook.currentSquare.row, kingSideRook.currentSquare.col - 2, kingSideRook)));
        }
        if (queenSideRook && !queenSideRook.hasMoved && !king.hasMoved) {
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCastlingMove"])(king, queenSideRook, king.currentSquare, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(king.currentSquare.row, king.currentSquare.col - 2, king), queenSideRook.currentSquare, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(queenSideRook.currentSquare.row, queenSideRook.currentSquare.col + 3, queenSideRook)));
        }
    };
    directions.forEach(([dRow, dCol])=>{
        let newRow = row + dRow;
        let newCol = col + dCol;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol, piece);
            const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
            const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
            if (capturedPiece) {
                legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare, capturedPiece));
            } else if (!targetPiece) {
                legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare));
            }
        }
    });
    addCastlingMoves(board, piece, legalMoves);
    return legalMoves;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/strategies/knightMovementStrategy.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "knightMovementStrategy": (()=>knightMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-client] (ecmascript)");
;
const knightMovementStrategy = (board, isBoardFlipped, piece)=>{
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
            const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol, piece);
            const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
            const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
            if (capturedPiece) {
                legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare, capturedPiece));
            } else if (!targetPiece) {
                legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare));
            }
        }
    });
    return legalMoves;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/strategies/pawnMovementStrategy.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "pawnMovementStrategy": (()=>pawnMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/types/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-client] (ecmascript)");
;
;
const pawnMovementStrategy = (board, isBoardFlipped, piece, moveHistory)=>{
    const legalMoves = [];
    const { row, col } = piece.currentSquare;
    const direction = piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? -1 : 1;
    const backRank = piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 0 : 7;
    const startingRow = piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 6 : 1;
    const addNormalMoves = (row, col, direction, backRank, piece, board, legalMoves)=>{
        const newRow = row + direction;
        if (newRow !== backRank && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmpty"])(board, newRow, col)) {
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(row, col), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(newRow, col, piece)));
        }
    };
    const addDoubleMove = (row, col, direction, startingRow, piece, board, legalMoves)=>{
        const newRow = row + 2 * direction;
        if (row === startingRow && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmpty"])(board, row + direction, col) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmpty"])(board, newRow, col)) {
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(row, col), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(newRow, col, piece)));
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
                const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol);
                const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
                const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
                if (capturedPiece && newRow === backRank) {
                    return;
                }
                capturedPiece && legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(row, col, piece), targetSquare, capturedPiece));
            }
        });
    };
    const addEnPassantMoves = (row, col, piece, board, moveHistory, legalMoves)=>{
        if (!moveHistory) {
            return;
        }
        const enPassantStartingRow = piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 1 : 6;
        const enPassantEndRow = piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 3 : 4;
        const direction = piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? -1 : 1;
        const lastMove = moveHistory[moveHistory.length - 1];
        if (lastMove && lastMove.piece.type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].PAWN && lastMove.from.row === enPassantStartingRow && lastMove.to.row === enPassantEndRow && row === enPassantEndRow && Math.abs(col - lastMove.to.col) === 1) {
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
                const tempMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEnPassantMove"])(piece, currentSquare, targetSquare, capturedPiece.currentSquare, capturedPiece);
                legalMoves.push(tempMove);
            }
        }
    };
    const addPromotionMoves = (row, col, piece, board, legalMoves)=>{
        const direction = piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? -1 : 1;
        const rowBeforePromotionRow = piece.color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? 1 : 6;
        const forwardSquare = {
            row: row + direction,
            col
        };
        if (row === rowBeforePromotionRow) {
            if (!board[forwardSquare.row][forwardSquare.col].piece) {
                Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"]).forEach((promotionType)=>{
                    if (promotionType !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].PAWN && promotionType !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].KING) {
                        const promotionMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPromotionMove"])(piece, {
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
                    Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"]).forEach((promotionType)=>{
                        if (promotionType !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].PAWN && promotionType !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].KING) {
                            const promotionMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPromotionMove"])(piece, {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/strategies/queenMovementStrategy.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "queenMovementStrategy": (()=>queenMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-client] (ecmascript)");
;
const queenMovementStrategy = (board, isBoardFlipped, piece)=>{
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
            const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol, piece);
            const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
            const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
            if (targetPiece && targetPiece.color === piece.color) {
                break;
            }
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare, capturedPiece));
            if (capturedPiece) {
                break;
            }
            newRow += dRow;
            newCol += dCol;
        }
    });
    return legalMoves;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/strategies/rookMovementStrategy.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "rookMovementStrategy": (()=>rookMovementStrategy)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-client] (ecmascript)");
;
const rookMovementStrategy = (board, isBoardFlipped, piece)=>{
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
            const targetSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(newRow, newCol, piece);
            const targetPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPieceAt"])(board, newRow, newCol);
            const capturedPiece = targetPiece && targetPiece.color !== piece.color ? targetPiece : undefined;
            if (targetPiece && targetPiece.color === piece.color) {
                break;
            }
            legalMoves.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStandardMove"])(piece, piece.currentSquare, targetSquare, capturedPiece));
            if (capturedPiece) {
                break;
            }
            newRow += dRow;
            newCol += dCol;
        }
    });
    return legalMoves;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/strategies/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/strategies/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$bishopMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/bishopMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$kingMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/kingMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$knightMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/knightMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$pawnMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/pawnMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$queenMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/queenMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$rookMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/rookMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/index.ts [app-client] (ecmascript) <locals>");
}}),
"[project]/src/app/projects/chess/utils/board.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "defaultBoard": (()=>defaultBoard),
    "getPieceAt": (()=>getPieceAt),
    "isEmpty": (()=>isEmpty),
    "setupPieces": (()=>setupPieces)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/types/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$rookMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/rookMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$knightMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/knightMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$bishopMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/bishopMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$queenMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/queenMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$kingMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/kingMovementStrategy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$pawnMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/strategies/pawnMovementStrategy.ts [app-client] (ecmascript)");
;
;
;
const defaultBoard = ()=>{
    return Array.from({
        length: 8
    }, (_, row)=>Array.from({
            length: 8
        }, (_, col)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSquare"])(row, col, undefined)));
};
const setupPieces = (isBoardFlipped)=>[
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].ROOK,
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
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$rookMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rookMovementStrategy"]
        },
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].KNIGHT,
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
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$knightMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["knightMovementStrategy"]
        },
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].BISHOP,
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
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$bishopMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bishopMovementStrategy"]
        },
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].QUEEN,
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
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$queenMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queenMovementStrategy"]
        },
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].KING,
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
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$kingMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kingMovementStrategy"]
        },
        {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].PAWN,
            positions: Array.from({
                length: 8
            }, (_, col)=>({
                    row: 1,
                    col
                })),
            movementStrategy: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$strategies$2f$pawnMovementStrategy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pawnMovementStrategy"]
        }
    ];
const getPieceAt = (board, row, col)=>{
    return board[row][col].piece;
};
const isEmpty = (board, row, col)=>{
    return !board[row][col].piece;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/player.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createPlayer": (()=>createPlayer)
});
const createPlayer = (color, type)=>({
        color,
        type
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/piece.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createPiece": (()=>createPiece)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
;
const createPiece = (player, type, color, currentSquare, movementStrategy, isAlive, hasMoved)=>({
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        player,
        type,
        color,
        currentSquare,
        movementStrategy,
        isAlive,
        hasMoved
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/index.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/utils/index.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$square$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/square.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$move$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/move.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$player$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/player.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$piece$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/piece.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-client] (ecmascript) <locals>");
}}),
"[project]/src/app/projects/chess/hooks/useChessGame.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useChessGame": (()=>useChessGame)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/types/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/index.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$player$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/player.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$piece$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/utils/piece.ts [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
;
;
;
const useChessGame = ()=>{
    _s();
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        board: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultBoard"])(),
        players: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$player$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPlayer"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerType"].HUMAN),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$player$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPlayer"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].BLACK, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerType"].HUMAN)
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
        const setup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupPieces"])(isBoardFlipped);
        const newBoard = gameState.board;
        let newPiecesByPlayer = new Map();
        [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].BLACK
        ].forEach((color)=>{
            const isWhite = color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE;
            const rowOffset = isBoardFlipped ? isWhite ? 0 : 7 : isWhite ? 7 : 0;
            const pawnRow = isBoardFlipped ? isWhite ? 1 : 6 : isWhite ? 6 : 1;
            setup.forEach(({ type, positions, movementStrategy })=>{
                positions.forEach(({ row, col })=>{
                    const player = color === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerColor"].WHITE ? player1 : player2;
                    const pieceRow = row + (type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].PAWN ? pawnRow - 1 : rowOffset);
                    const square = gameState.board[pieceRow][col];
                    const hasMoved = type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].ROOK || type === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceType"].KING ? false : undefined;
                    const piece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$utils$2f$piece$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPiece"])(player, type, color, square, movementStrategy, true, hasMoved);
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
_s(useChessGame, "MqmN6tSVJJRPrIvFmjYNxa4T2pE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/components/board/ChessPiece.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ChessPiece": (()=>ChessPiece)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ChessPiece = ({ piece, type, color, square })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        className: "h-3/4 z-10",
        src: `/assets/images/${color}-${type}.svg`,
        alt: `${type}`
    }, void 0, false, {
        fileName: "[project]/src/app/projects/chess/components/board/ChessPiece.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
};
_c = ChessPiece;
var _c;
__turbopack_refresh__.register(_c, "ChessPiece");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/components/board/ChessSquare.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ChessSquare": (()=>ChessSquare)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ChessSquare = ({ square, isBoardFlipped, children })=>{
    const isDark = (square[0] + square[1]) % 2 === 0;
    const isLabeledColumn = square[1] === 7;
    const isLabeledRow = square[0] === 7;
    const columnLabel = isBoardFlipped ? 1 + square[0] : 8 - square[0];
    const rowLabel = isBoardFlipped ? String.fromCharCode(104 - square[1]) : String.fromCharCode(97 + square[1]);
    const getColor = (isDark)=>{
        return isDark ? "bg-orange-200" : "bg-yellow-900";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative flex justify-center items-center w-full h-full aspect-square ${getColor(isDark)}`,
        children: [
            children,
            isLabeledColumn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute top-0 right-0 pt-1 pr-1 text-xs lg:text-sm ${isDark ? "text-yellow-900" : "text-orange-200"} select-none`,
                children: columnLabel
            }, void 0, false, {
                fileName: "[project]/src/app/projects/chess/components/board/ChessSquare.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this),
            isLabeledRow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute bottom-0 left-0 pl-1 text-xs lg:text-sm ${isDark ? "text-yellow-900" : "text-orange-200"} select-none`,
                children: rowLabel
            }, void 0, false, {
                fileName: "[project]/src/app/projects/chess/components/board/ChessSquare.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/projects/chess/components/board/ChessSquare.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
};
_c = ChessSquare;
var _c;
__turbopack_refresh__.register(_c, "ChessSquare");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/components/board/Board.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Board": (()=>Board)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$ChessPiece$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/components/board/ChessPiece.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$ChessSquare$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/components/board/ChessSquare.tsx [app-client] (ecmascript)");
;
;
;
const Board = ({ board, isBoardFlipped })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "chessboard",
        className: "relative grid grid-cols-8 w-[90vmin] h-[90vmin] lg:w-[70vmin] lg:h-[70vmin]",
        children: board.map((row, rowIndex)=>row.map((square, colIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$ChessSquare$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChessSquare"], {
                    square: [
                        rowIndex,
                        colIndex
                    ],
                    isBoardFlipped: isBoardFlipped,
                    children: square.piece && square.piece.isAlive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$ChessPiece$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChessPiece"], {
                        type: square.piece.type,
                        color: square.piece.color,
                        piece: square.piece,
                        square: [
                            rowIndex,
                            colIndex
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/app/projects/chess/components/board/Board.tsx",
                        lineNumber: 24,
                        columnNumber: 15
                    }, this)
                }, `${rowIndex}-${colIndex}`, false, {
                    fileName: "[project]/src/app/projects/chess/components/board/Board.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, this)))
    }, void 0, false, {
        fileName: "[project]/src/app/projects/chess/components/board/Board.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
};
_c = Board;
var _c;
__turbopack_refresh__.register(_c, "Board");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/components/ui/ChessGameContainer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ChessGameContainer": (()=>ChessGameContainer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$hooks$2f$useChessGame$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/hooks/useChessGame.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$Board$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/projects/chess/components/board/Board.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
const ChessGameContainer = ()=>{
    _s();
    const gameManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$hooks$2f$useChessGame$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChessGame"])();
    const [isBoardFlipped, setisBoardFlipped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChessGameContainer.useEffect": ()=>{
            gameManager.initializeBoard(isBoardFlipped);
        }
    }["ChessGameContainer.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col justify-center lg:flex-row",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$components$2f$board$2f$Board$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Board"], {
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
_s(ChessGameContainer, "jaxMM812d6pPdFFmqtsLC1o6U/w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$projects$2f$chess$2f$hooks$2f$useChessGame$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChessGame"]
    ];
});
_c = ChessGameContainer;
var _c;
__turbopack_refresh__.register(_c, "ChessGameContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/projects/chess/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE$2 ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function disabledLog() {}
    function disableLogs() {
        if (0 === disabledDepth) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
                configurable: !0,
                enumerable: !0,
                value: disabledLog,
                writable: !0
            };
            Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
            });
        }
        disabledDepth++;
    }
    function reenableLogs() {
        disabledDepth--;
        if (0 === disabledDepth) {
            var props = {
                configurable: !0,
                enumerable: !0,
                writable: !0
            };
            Object.defineProperties(console, {
                log: assign({}, props, {
                    value: prevLog
                }),
                info: assign({}, props, {
                    value: prevInfo
                }),
                warn: assign({}, props, {
                    value: prevWarn
                }),
                error: assign({}, props, {
                    value: prevError
                }),
                group: assign({}, props, {
                    value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                    value: prevGroupEnd
                })
            });
        }
        0 > disabledDepth && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
    function describeBuiltInComponentFrame(name) {
        if (void 0 === prefix) try {
            throw Error();
        } catch (x) {
            var match = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || "";
            suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
        return "\n" + prefix + name + suffix;
    }
    function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) return "";
        var frame = componentFrameCache.get(fn);
        if (void 0 !== frame) return frame;
        reentry = !0;
        frame = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher = null;
        previousDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = null;
        disableLogs();
        try {
            var RunInRootFrame = {
                DetermineComponentFrameRoot: function() {
                    try {
                        if (construct) {
                            var Fake = function() {
                                throw Error();
                            };
                            Object.defineProperty(Fake.prototype, "props", {
                                set: function() {
                                    throw Error();
                                }
                            });
                            if ("object" === typeof Reflect && Reflect.construct) {
                                try {
                                    Reflect.construct(Fake, []);
                                } catch (x) {
                                    var control = x;
                                }
                                Reflect.construct(fn, [], Fake);
                            } else {
                                try {
                                    Fake.call();
                                } catch (x$0) {
                                    control = x$0;
                                }
                                fn.call(Fake.prototype);
                            }
                        } else {
                            try {
                                throw Error();
                            } catch (x$1) {
                                control = x$1;
                            }
                            (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {});
                        }
                    } catch (sample) {
                        if (sample && control && "string" === typeof sample.stack) return [
                            sample.stack,
                            control.stack
                        ];
                    }
                    return [
                        null,
                        null
                    ];
                }
            };
            RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
            namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot"
            });
            var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
            if (sampleStack && controlStack) {
                var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
                for(_RunInRootFrame$Deter = namePropDescriptor = 0; namePropDescriptor < sampleLines.length && !sampleLines[namePropDescriptor].includes("DetermineComponentFrameRoot");)namePropDescriptor++;
                for(; _RunInRootFrame$Deter < controlLines.length && !controlLines[_RunInRootFrame$Deter].includes("DetermineComponentFrameRoot");)_RunInRootFrame$Deter++;
                if (namePropDescriptor === sampleLines.length || _RunInRootFrame$Deter === controlLines.length) for(namePropDescriptor = sampleLines.length - 1, _RunInRootFrame$Deter = controlLines.length - 1; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter && sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter];)_RunInRootFrame$Deter--;
                for(; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter; namePropDescriptor--, _RunInRootFrame$Deter--)if (sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                    if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
                        do if (namePropDescriptor--, _RunInRootFrame$Deter--, 0 > _RunInRootFrame$Deter || sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                            var _frame = "\n" + sampleLines[namePropDescriptor].replace(" at new ", " at ");
                            fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName));
                            "function" === typeof fn && componentFrameCache.set(fn, _frame);
                            return _frame;
                        }
                        while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter)
                    }
                    break;
                }
            }
        } finally{
            reentry = !1, ReactSharedInternals.H = previousDispatcher, reenableLogs(), Error.prepareStackTrace = frame;
        }
        sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(sampleLines) : "";
        "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
        return sampleLines;
    }
    function describeUnknownElementTypeFrameInDEV(type) {
        if (null == type) return "";
        if ("function" === typeof type) {
            var prototype = type.prototype;
            return describeNativeComponentFrame(type, !(!prototype || !prototype.isReactComponent));
        }
        if ("string" === typeof type) return describeBuiltInComponentFrame(type);
        switch(type){
            case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
        }
        if ("object" === typeof type) switch(type.$$typeof){
            case REACT_FORWARD_REF_TYPE:
                return type = describeNativeComponentFrame(type.render, !1), type;
            case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type);
            case REACT_LAZY_TYPE:
                prototype = type._payload;
                type = type._init;
                try {
                    return describeUnknownElementTypeFrameInDEV(type(prototype));
                } catch (x) {}
        }
        return "";
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self) {
        if ("string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_OFFSCREEN_TYPE || "object" === typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE$1 || void 0 !== type.getModuleId)) {
            var children = config.children;
            if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
                for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren], type);
                Object.freeze && Object.freeze(children);
            } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else validateChildKeys(children, type);
        } else {
            children = "";
            if (void 0 === type || "object" === typeof type && null !== type && 0 === Object.keys(type).length) children += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            null === type ? isStaticChildren = "null" : isArrayImpl(type) ? isStaticChildren = "array" : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE ? (isStaticChildren = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />", children = " Did you accidentally export a JSX literal instead of a component?") : isStaticChildren = typeof type;
            console.error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", isStaticChildren, children);
        }
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey);
    }
    function validateChildKeys(node, parentType) {
        if ("object" === typeof node && node && node.$$typeof !== REACT_CLIENT_REFERENCE) {
            if (isArrayImpl(node)) for(var i = 0; i < node.length; i++){
                var child = node[i];
                isValidElement(child) && validateExplicitKey(child, parentType);
            }
            else if (isValidElement(node)) node._store && (node._store.validated = 1);
            else if (null === node || "object" !== typeof node ? i = null : (i = MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL] || node["@@iterator"], i = "function" === typeof i ? i : null), "function" === typeof i && i !== node.entries && (i = i.call(node), i !== node)) for(; !(node = i.next()).done;)isValidElement(node.value) && validateExplicitKey(node.value, parentType);
        }
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function validateExplicitKey(element, parentType) {
        if (element._store && !element._store.validated && null == element.key && (element._store.validated = 1, parentType = getCurrentComponentErrorInfo(parentType), !ownerHasKeyUseWarning[parentType])) {
            ownerHasKeyUseWarning[parentType] = !0;
            var childOwner = "";
            element && null != element._owner && element._owner !== getOwner() && (childOwner = null, "number" === typeof element._owner.tag ? childOwner = getComponentNameFromType(element._owner.type) : "string" === typeof element._owner.name && (childOwner = element._owner.name), childOwner = " It was passed a child from " + childOwner + ".");
            var prevGetCurrentStack = ReactSharedInternals.getCurrentStack;
            ReactSharedInternals.getCurrentStack = function() {
                var stack = describeUnknownElementTypeFrameInDEV(element.type);
                prevGetCurrentStack && (stack += prevGetCurrentStack() || "");
                return stack;
            };
            console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.', parentType, childOwner);
            ReactSharedInternals.getCurrentStack = prevGetCurrentStack;
        }
    }
    function getCurrentComponentErrorInfo(parentType) {
        var info = "", owner = getOwner();
        owner && (owner = getComponentNameFromType(owner.type)) && (info = "\n\nCheck the render method of `" + owner + "`.");
        info || (parentType = getComponentNameFromType(parentType)) && (info = "\n\nCheck the top-level render call using <" + parentType + ">.");
        return info;
    }
    var React = __turbopack_require__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, assign = Object.assign, REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference"), isArrayImpl = Array.isArray, disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
    disabledLog.__reactDisabledLog = !0;
    var prefix, suffix, reentry = !1;
    var componentFrameCache = new ("function" === typeof WeakMap ? WeakMap : Map)();
    var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var didWarnAboutKeySpread = {}, ownerHasKeyUseWarning = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self);
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_require__("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
"[project]/node_modules/uuid/dist/esm-browser/native.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const __TURBOPACK__default__export__ = {
    randomUUID
};
}}),
"[project]/node_modules/uuid/dist/esm-browser/rng.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>rng)
});
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}
}}),
"[project]/node_modules/uuid/dist/esm-browser/regex.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const __TURBOPACK__default__export__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
}}),
"[project]/node_modules/uuid/dist/esm-browser/validate.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$regex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-browser/regex.js [app-client] (ecmascript)");
;
function validate(uuid) {
    return typeof uuid === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$regex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].test(uuid);
}
const __TURBOPACK__default__export__ = validate;
}}),
"[project]/node_modules/uuid/dist/esm-browser/stringify.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "unsafeStringify": (()=>unsafeStringify)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-browser/validate.js [app-client] (ecmascript)");
;
const byteToHex = [];
for(let i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
const __TURBOPACK__default__export__ = stringify;
}}),
"[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$native$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-browser/native.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-browser/rng.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-browser/stringify.js [app-client] (ecmascript)");
;
;
;
function v4(options, buf, offset) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$native$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].randomUUID && !buf && !options) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$native$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unsafeStringify"])(rnds);
}
const __TURBOPACK__default__export__ = v4;
}}),
"[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "v4": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_4a77d7._.js.map