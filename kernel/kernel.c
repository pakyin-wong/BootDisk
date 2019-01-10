#include "../cpu/isr.h"
#include "../drivers/screen.h"
#include "kernel.h"
#include "../libc/string.h"
#include "../libc/mem.h"
#include "../keygen/keygen.h"
#include <stdint.h>

void kernel_main() {
    isr_install();
    irq_install();

    asm("int $2");
    asm("int $3");

    kprint("Type something, it will go through the kernel\n"
        "Type KEY [5 digit seed] (e.g KEY 12394) to generate an 64 characters random key\n"
        "Type END to halt the CPU or PAGE to request a kmalloc()\n> ");
}

void user_input(char *input) {
    kprint("\n");
    if (strcmp(input, "END") == 0) {
        kprint("Stopping the CPU. Bye!\n");
        asm volatile("hlt");
    } else if (strcmp(input, "PAGE") == 0) {
        uint32_t phys_addr;
        uint32_t page = kmalloc(1000, 1, &phys_addr);
        char page_str[16] = "";
        hex_to_ascii(page, page_str);
        char phys_str[16] = "";
        hex_to_ascii(phys_addr, phys_str);
        kprint("Page: ");
        kprint(page_str);
        kprint(", physical address: ");
        kprint(phys_str);
        kprint("\n");
    } else if (iskey(input)){
        if (strlen(input) <= 4){
            kprint("Please enter the seed. e.g KEY 12321 \n");
        }else{
            char key[100] = "";
            keygen(input+4, key);
            kprint("Seed: ");
            kprint(input+4);
            kprint("\n");
            kprint("Key: 0x");
            kprint(key);
            kprint("\n");
            kprint("Key Length: ");
            char keylength[20] = "";
            int_to_ascii(strlen(key) , keylength);
            kprint(keylength);
            kprint("\n");

        }
    }
    kprint("You said: ");
    kprint(input);
    kprint("\n> ");
}
