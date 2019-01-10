#include "../libc/string.h"
#include <stdint.h>

static uint32_t next = 1;

int rand(void) // RAND_MAX assumed to be 32767
{
    next = next * 1103515245 + 12345;
    return (uint32_t)(next/65536) % 32768;
}

void srand(uint32_t seed)
{
    next = seed;
}

int getseed(char in[]){
  int length = strlen(in);
  int result = 0;
  int position = 1;
  for (int i = length - 1; i >= 0; i--){
    if (in[i] >= 48 && in[i] <= 55){     
      int digit = in[i] - 48;
      result += digit * position;
    }
    position *= 10;
  }
  return result;
}

void keygen(char in[], char out[]){
  int seed = getseed(in);
  srand(seed);
  for (int i = 0; i < 63; i++){
    int number = rand() % 16;
    char keychar = 48;
    if (number < 10){ 
      keychar = 48 + number;
    }else if (number < 16){
      keychar = 55 + number;
    }
    append(out,keychar);
  }
}

int iskey(char input[]){
  int length = strlen(input);
  if(length >= 3){
    if (input[0] == 'K' && input[1] == 'E' && input[0] == 'Y')
      return 0;
  }
  return 1;
}