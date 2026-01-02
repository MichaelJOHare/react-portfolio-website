## If you are cloning this repository to implement your own Stockfish web app:

Sometimes Git Large File Storage (LFS) behaves strangely with these nnue files.
If you run into issues, delete the files in the project, download them and put those in the project.

Download NNUE files from: https://tests.stockfishchess.org/nns

## Stockfish 17.1 files

Big Eval File - nn-1c0000000000.nnue

Small Eval File - nn-37f18f62d772.nnue

Put them into public/stockfish/sf-17/ where sf171-79.js and sf171-79.wasm files are

**_ You need both big and small eval files, Stockfish 17.1 uses dual NNUE _**

## Stockfish 16 file

Eval file - nn-ecb35f70ff2a.nnue

Put it into public/stockfish/sf-16/ where sf-16-7.js and sf-16-7.wasm files are
