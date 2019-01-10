#ifndef KEYGEN_H
#define KEYGEN_H

int rand(void);
void srand(unsigned int seed);

int getseed(char in[]);
void keygen(char in[], char* out[]);
int iskey(char input[]);

#endif  
