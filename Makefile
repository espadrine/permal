permal:
	gcc -o permal permal.c

dieharder: permal
	./permal | dieharder -g 200 -a
