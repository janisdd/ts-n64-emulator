cd /usr/local/Cellar/llvm/17.0.4/bin

./clang -S -target mips -mcpu=mips3 /Users/janis/Documents/Projects/Web/ts-n64-emulator/mips_examples2/main.c -o /Users/janis/Documents/Projects/Web/ts-n64-emulator/mips_examples2/main.s

./clang -c -target mips -mcpu=mips3 /Users/janis/Documents/Projects/Web/ts-n64-emulator/mips_examples2/main.c -o /Users/janis/Documents/Projects/Web/ts-n64-emulator/mips_examples2/main.o
