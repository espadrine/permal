#include <stdio.h>
#include <unistd.h>
#define PERMAL_SIZE 256
#define BUFSIZE 1048576

typedef struct permal_state {
  unsigned char i;
  unsigned char perm[PERMAL_SIZE];
  unsigned char rand[PERMAL_SIZE];
} permal_state;

permal_state permal_init() {
  permal_state s;
  s.i = 0;
  for (int i = 0; i < PERMAL_SIZE; i++) {
    s.perm[i] = s.rand[i] = i;
  }
  return s;
}

unsigned char permal_gen(permal_state *s) {
  unsigned char a0 = s->i, a1 = s->rand[s->i];
  unsigned char tmp = s->perm[a0];
  s->perm[a0] = s->perm[a1];
  s->perm[a1] = tmp;
  unsigned char next = s->perm[s->i];
  s->rand[s->i] = (next + a1) % PERMAL_SIZE;
  s->i = (s->i + 1) % PERMAL_SIZE;
  return next;
}

int main() {
  permal_state s = permal_init();
  unsigned char buf[BUFSIZE];
  for (;;) {
    for (int i = 0; i < BUFSIZE; i++) {
      buf[i] = permal_gen(&s);
    }
    write(STDOUT_FILENO, buf, BUFSIZE);
  }
  return 0;
}
